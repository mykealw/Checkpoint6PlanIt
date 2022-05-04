import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async createTask(newTask, projectId) {
    const res = await api.post('api/projects/' + projectId + '/tasks', newTask)
    logger.log(res.data, 'createTask')
  }

  async getTasksByProject(projectId) {
    const res = await api.get('api/projects/' + projectId + '/tasks')
    logger.log(res.data, "tasks fetched")
    AppState.tasks = res.data
  }
}

export const tasksService = new TasksService()