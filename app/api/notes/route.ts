import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Note } from "@/types/note"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const userId = searchParams.get("userId")

    if (!date || !userId) {
      return NextResponse.json({ error: "Date and userId parameter is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("daily-notes")
    const collection = db.collection<Note>("notes")

    const notes = await collection.find({ date, userId: userId }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(notes)
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content, date, userId } = await request.json()

    if (!content || !date) {
      return NextResponse.json({ error: "Content and date are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("daily-notes")
    const collection = db.collection<Note>("notes")

    const note: Omit<Note, "_id"> = {
      userId,
      content,
      date,
      createdAt: new Date(),
    }

    const result = await collection.insertOne(note)
    const insertedNote = await collection.findOne({ _id: result.insertedId })

    return NextResponse.json(insertedNote)
  } catch (error) {
    console.error("Error creating note:", error)
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
  }
}
