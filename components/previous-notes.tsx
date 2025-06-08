"use client";

import { useNotes } from "@/contexts/notes-context";
import { Note } from "@/types/note";
import { NoteItem } from "./note-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Loader2 } from "lucide-react";

export function PreviousNotesList() {
  const { previousNotes, loading, error } = useNotes();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading your Previous logs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-600 font-medium mb-2">Error loading logs</div>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  if (!previousNotes || previousNotes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">
          No previous logs yet today
        </h3>
        <p className="text-slate-500">
          {"Start writing your first log to capture today's thoughts."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-slate-700">
          {"Previous Logs"}
        </h2>
        <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {previousNotes.length}{" "}
          {previousNotes.length === 1 ? "note" : "Days Records"}
        </div>
      </div>

      {previousNotes.map((group) => (
        <Accordion
          key={group.date}
          type="single"
          collapsible
          className="border rounded-md bg-slate-50 hover:bg-slate-200"
        >
          <AccordionItem value={group.date}>
            <AccordionTrigger className="px-4">
              <div className="flex justify-between w-full">
                <span>
                  {new Date(group.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-gray-500">
                  {group.notes.length} Logs
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-3">
                {group.notes.map((note: Note, index: number) => (
                  <NoteItem key={index} note={note} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
