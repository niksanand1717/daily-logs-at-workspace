"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Note, NotesContextType } from "@/types/note";
import { PreviousNotesType } from "@/components/types";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previousNotes, setPreviousNotes] = useState<PreviousNotesType[]>([]);
  const [userId, setUserId] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

  const fetchNotes = async (date: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notes?date=${date}&userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousNotes = async (
    userId: string
  ): Promise<PreviousNotesType[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notes/previous?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to load previous notes: ${response.status}`);
      }
      const prevNotes = await response.json();
      setPreviousNotes(prevNotes);
      return prevNotes;
    } catch (err) {
      console.error("Error fetching previous notes:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (content: string, userId: string) => {
    setError(null);
    if (!userId || userId === "") {
      throw new Error("User ID is blank");
    }
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          date: today,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const newNote = await response.json();
      setNotes((prev) => [newNote, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const setAuthUserId = async (newUserId: string): Promise<void> => {
    setUserId(newUserId);
  };

  useEffect(() => {
    if (userId) {
      fetchNotes(today, userId);
      fetchPreviousNotes(userId);
    }
  }, [today, userId]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        previousNotes,
        addNote,
        loading,
        error,
        userId,
        setAuthUserId,
        fetchPreviousNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
