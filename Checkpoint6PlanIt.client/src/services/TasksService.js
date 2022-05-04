import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async createTask(newTask, projectId) {
    const res = await api.post('api/projects/' + projectId + '/tasks', newTask)
    logger.log(res.data, 'createTask')
  }
}

export const tasksService = new TasksService()