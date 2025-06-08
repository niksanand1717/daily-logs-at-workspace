"use client";

import { NoteInput } from "@/components/note-input";
import { NotesList } from "@/components/notes-list";
import { PreviousNotesList } from "@/components/previous-notes";
import { NotesProvider, useNotes } from "@/contexts/notes-context";
import { BookOpen, Calendar, User } from "lucide-react";
import { Protected } from "../auth/protected";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthStatus, LogoutButton } from "@/components/auth/auth-screen";
import { useEffect } from "react";

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Correctly use the useAuth0 hook
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setAuthUserId } = useNotes();

  useEffect(() => {
    if (isAuthenticated && user && user.sub) {
      setAuthUserId(user.sub);
    }
  }, [user, isAuthenticated, setAuthUserId]);

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header with User Info */}
          <header className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Daily Logs
                </h1>
              </div>

              {/* User Profile Section */}
              {isAuthenticated && user && (
                <div className="relative group">
                  <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name || "User profile"}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                    )}
                    <div className="text-left pr-1">
                      <p className="font-medium text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-slate-400"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-700">
                          Signed in as
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="pt-2">
                        <div className="border-t border-slate-100 my-1"></div>
                        <LogoutButton />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <Calendar className="w-5 h-5" />
                <time className="text-lg font-medium">{today}</time>
              </div>

              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Capture your thoughts, ideas, and moments throughout the day
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-2xl mx-auto">
            <NoteInput />
            <NotesList />
            <PreviousNotesList />
          </main>
        </div>
      </div>
    </Protected>
  );
}
