import { dbContext } from "../db/DbContext.js";

class NotesService {
  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator', 'name picture')
    return note
  }
  async deletedNote(noteId) {
    // FIXME need to check the creator of the note against the person logged in with auth
    const noteToDelete = await dbContext.Notes.findByIdAndDelete(noteId)
    return noteToDelete
  }
  async getNotesByProject(projectId) {
    return await dbContext.Notes.find({ projectId: projectId }).populate('creator')
  }


}

export const notesService = new NotesService()