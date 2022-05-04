import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async createTask(newTask, projectId) {
    const res = await api.post('api/projects/' + projectId + '/tasks', newTask)
    // logger.log(res.data, 'createTask')
    AppState.tasks.push(res.data)
  }

  async getTasksByProject(projectId) {
    const res = await api.get('api/projects/' + projectId + '/tasks')
    // logger.log(res.data, "tasks fetched")
    AppState.tasks = res.data
  }
  async deleteTask(taskId, projectId) {
    // logger.log(taskId, projectId, 'taskid projectid')
    const res = await api.delete('api/projects/' + projectId + '/tasks/' + taskId)
    AppState.tasks = AppState.tasks.filter(t => t.id != taskId)
    // logger.log(AppState.tasks)
  }

  async editTask(edit) {
    logger.log(AppState.tasks, "before")
    const res = await api.put('api/projects/' + edit.projectId + '/tasks/' + edit.taskId, edit)
    // logger.log(res.data, "our edit ")
    AppState.tasks.splice(AppState.tasks.indexOf(edit.taskId), 1, edit)
    logger.log(AppState.tasks, "after")


  }

}


export const tasksService = new TasksService()