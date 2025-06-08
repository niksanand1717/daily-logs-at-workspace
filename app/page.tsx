import { NoteInput } from "@/components/note-input"
import { NotesList } from "@/components/notes-list"
import { PreviousNotesList } from "@/components/previous-notes"
import { NotesProvider } from "@/contexts/notes-context"
import { Calendar, BookOpen } from "lucide-react"
import Dashboard from "./dashboard/page"

export default function HomePage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Dashboard/>
  )
}
