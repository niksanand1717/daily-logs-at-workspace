import { ObjectId } from "mongodb"
import { PreviousNotesType } from "@/components/types"


export interface Note {
  userId: string,
  _id?: ObjectId
  content: string
  createdAt: Date
  date: string // YYYY-MM-DD format
}

export interface NotesContextType {
  notes: Note[]
  previousNotes: PreviousNotesType[],
  addNote: (content: string, userId: string) => Promise<void>
  loading: boolean
  error: string | null
  userId: string
  setAuthUserId: (userId: string) => Promise<void>
  fetchPreviousNotes: (userId: string) => Promise<PreviousNotesType[]>
}
