import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
  async createSprint(newSprint, projectId) {
    const res = await api.post('api/projects/' + projectId + '/sprints', newSprint)
    AppState.sprints = res.data
    logger.log(AppState.sprints, 'createSprint')
  }
}

export const sprintsService = new SprintsService()