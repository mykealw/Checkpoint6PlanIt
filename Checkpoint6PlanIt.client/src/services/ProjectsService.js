import { AppState } from "../AppState.js"
import { router } from "../router.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class ProjectsService {
    async createProject(newProject) {
        const res = await api.post('api/projects', newProject)
        AppState.projects.push(res.data)
        return res.data
        // logger.log(res.data, "this is new project")
    }
    async getMyProjects() {
        const res = await api.get('api/projects')
        AppState.projects = res.data
        logger.log(res.data, "this is the projects")
    }
    async deleteProject(projectid) {
        const res = await api.delete('api/projects/' + projectid)
        // AppState.projects = AppState.projects.filter(p => projectid !== projectId)
        router.push({ name: 'Home' })
    }
    async getProjectById(projectId) {
        const res = await api.get('api/projects/' + projectId)
        AppState.activeProject = res.data
        // logger.log(res.data, "test$$")
    }
}

export const projectsService = new ProjectsService()