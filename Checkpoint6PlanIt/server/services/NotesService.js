import { dbContext } from "../db/DbContext.js";

class NotesService {
  async deletedNote(noteId) {
    const noteToDelete = await dbContext.Notes.findByIdAndDelete(noteId)
    return noteToDelete
  }
  async getNotesByProject(projectId) {
    return await dbContext.Notes.find({ projectId: projectId }).populate('creator', 'name')
  }


}

export const notesService = new NotesService()