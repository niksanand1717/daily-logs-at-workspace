"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/contexts/notes-context";
import { Plus, Send } from "lucide-react";

export function NoteInput() {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addNote, loading, userId } = useNotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await addNote(content.trim(), userId);
    setContent("");
    setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isExpanded]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  if (!isExpanded) {
    return (
      <div className="mb-8">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 text-left text-slate-500 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center gap-3">
            <Plus className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="text-base">{"What's on your mind today?"}</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your note here..."
          className="w-full p-4 text-base text-slate-700 bg-transparent border-none resize-none outline-none placeholder:text-slate-400 min-h-[120px]"
          style={{ overflow: "hidden" }}
        />
        <div className="flex items-center justify-between p-4 pt-0">
          <div className="text-sm text-slate-400">Press Cmd+Enter to save</div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                setContent("");
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!content.trim() || loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Save Note
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
