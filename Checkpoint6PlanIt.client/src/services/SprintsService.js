import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
  async createSprint(newSprint, projectId) {
    const res = await api.post('api/projects/' + projectId + '/sprints', newSprint)
    AppState.sprints = res.data
    logger.log(AppState.sprints, 'createSprint')
  }
  async getSprintsByProject(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')

    logger.log(AppState.sprints, 'createSprint')
    AppState.sprints = res.data
  }
}

export const sprintsService = new SprintsService()