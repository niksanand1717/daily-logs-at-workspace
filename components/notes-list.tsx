"use client";

import { useNotes } from "@/contexts/notes-context";
import { NoteItem } from "./note-item";
import { FileText, Loader2 } from "lucide-react";

export function NotesList() {
  const { notes, loading, error } = useNotes();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading your logs...</span>
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

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">
          No logs yet today
        </h3>
        <p className="text-slate-500">
          {"Start writing your first note to capture today's thoughts."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-slate-700">
          {"Today's Notes"}
        </h2>
        <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </div>
      </div>

      {notes.map((note, index) => (
        <NoteItem key={index} note={note} />
      ))}
    </div>
  );
}
