"use client"

import type { Note } from "@/types/note"

interface NoteItemProps {
  note: Note
}

export function NoteItem({ note }: NoteItemProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group mb-3">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="text-sm font-mono text-slate-500 bg-slate-50 px-3 py-1 rounded-full border">
            {formatTime(note.createdAt)}
          </div>
        </div>

        <div className="w-px h-6 bg-slate-200 flex-shrink-0 mt-1"></div>

        <div className="flex-1 min-w-0">
          <div className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap break-words">
            {formatContent(note.content)}
          </div>
        </div>
      </div>
    </div>
  )
}
