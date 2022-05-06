import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async createTask(newTask, projectId) {
    const res = await api.post('api/projects/' + projectId + '/tasks', newTask)
    // logger.log(res.data, 'createTask')
    AppState.tasks.push(res.data)
  }
  async createNote(newNote, projectId) {
    const res = await api.post('api/projects/' + projectId + '/notes', newNote)
    // logger.log(res.data, 'createnote')
    AppState.notes.push(res.data)
  }

  async getTasksByProject(projectId) {
    const res = await api.get('api/projects/' + projectId + '/tasks')
    // logger.log(res.data, "tasks fetched")
    AppState.tasks = res.data
  }
  async getNotesByProject(projectId) {
    const res = await api.get('api/projects/' + projectId + '/notes')
    // logger.log(res.data, "notes fetched")
    AppState.notes = res.data
  }
  async deleteTask(taskId, projectId) {
    // logger.log(taskId, projectId, 'taskid projectid')
    const res = await api.delete('api/projects/' + projectId + '/tasks/' + taskId)
    AppState.tasks = AppState.tasks.filter(t => t.id != taskId)
    // logger.log(AppState.tasks)
  }

  async editTask(edit) {
    // logger.log(AppState.tasks, "before")
    const res = await api.put('api/projects/' + edit.projectId + '/tasks/' + edit.taskId, edit)
    // logger.log(res.data, "our edit ")
    const index = AppState.tasks.findIndex(t => t.id === res.data.id)
    if (index != -1) {
      AppState.tasks.splice(index, 1, res.data)
    }
    // logger.log(AppState.tasks.indexOf(edit.taskId), 'hot dawg')
    // logger.log(AppState.tasks, "after")
  }
  async deleteNote(noteId, projectId) {
    // logger.log(noteId, projectId, 'noteId projectid')
    const res = await api.delete('api/projects/' + projectId + '/notes/' + noteId)
    AppState.notes = AppState.notes.filter(n => n.id != noteId)
    // logger.log(AppState.notes)
  }
}


export const tasksService = new TasksService()