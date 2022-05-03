import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class ProjectsService {
    async createProject(newProject) {
        const res = await api.post('api/projects', newProject)
        // logger.log(res.data, "this is new project")
        AppState.projects = AppState.projects.push(res.data)
    }
    async getMyProjects() {
        const res = await api.get('api/projects')
        AppState.projects = res.data
        logger.log(res.data, "this is the projects")
    }

}

export const projectsService = new ProjectsService()