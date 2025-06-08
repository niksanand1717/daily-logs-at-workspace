import clientPromise from "@/lib/mongodb";
import { Note } from "@/types/note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("daily-notes");
    const collection = db.collection<Note>("notes");

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get date parameter if provided
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    const userId = searchParams.get("userId");

    let matchStage = {};

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (dateParam) {
      // If a specific date is provided, use it
      matchStage = { date: dateParam, userId: userId };
    } else {
      // Otherwise find notes from before today
      matchStage = {
        $or: [
          // Either the date string is before today
          { date: { $lt: today.toISOString().split("T")[0] } },
          // Or the createdAt date is before today
          { createdAt: { $lt: today } },
        ],
        userId: userId,
      };
    }

    // Try a simple find first to debug
    // const simpleFind = await collection.find({ userId: userId }).toArray();

    // Use aggregation to group by date
    const groupedNotes = await collection
      .aggregate([
        // Stage 1: Match documents that are before today
        { $match: matchStage },

        // Stage 2: Sort by date and then by createdAt
        { $sort: { date: -1, createdAt: -1 } },

        // Stage 3: Group notes by date
        {
          $group: {
            _id: "$date", // Group by the date field
            date: { $first: "$date" }, // Keep the date
            notes: {
              $push: {
                _id: "$_id",
                content: "$content",
                createdAt: "$createdAt",
              },
            },
            count: { $sum: 1 }, // Count notes for this date
          },
        },

        // Stage 4: Sort the groups by date descending (newest first)
        { $sort: { date: -1 } },

        // Stage 5: Limit to most recent dates
        { $limit: 10 },
      ])
      .toArray();

    return NextResponse.json(groupedNotes);
  } catch (error) {
    console.error("Error fetching previous notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch previous notes" },
      { status: 500 }
    );
  }
}
