import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import { projectsService } from "../services/ProjectsService.js";
import { sprintsService } from "../services/SprintsService.js";
import { tasksService } from "../services/TasksService.js";
import BaseController from '../utils/BaseController.js'

export class ProjectsController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:projectId/notes', this.getNotesByProject)
            .get('/:projectId/tasks', this.getTasksByProject)
            .get('/:projectId/sprints', this.getSprintsByProject)
            .get('/:id', this.getProjectById)
            .get('', this.getAllProjects)
            .post('', this.createProject)
            .delete('/:id', this.deleteProject)

    }
    async getTasksByProject(req, res, next) {
        try {
            const tasks = await tasksService.getTasksByProject(req.params.projectId)
            res.send(tasks)
        }
        catch (error) {
            next(error)
        }

    }

    async getSprintsByProject(req, res, next) {
        try {
            const sprints = await sprintsService.getSprintsByProject(req.params.projectId)
            res.send(sprints)
        }
        catch (error) {
            next(error)
        }
    }

    async getNotesByProject(req, res, next) {
        try {
            const notes = await notesService.getNotesByProject(req.params.projectId)
            return res.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async deleteProject(req, res, next) {
        try {
            const project = await projectsService.deleteProject(req.params.id)
            res.send(project)
        }
        catch (error) {
            next(error)
        }
    }
    async createProject(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const project = await projectsService.createProject(req.body)
            res.send(project)
        }
        catch (error) {
            next(error)
        }
    }
    async getProjectById(req, res, next) {
        try {
            const project = await projectsService.getProjectById(req.params.id)
            res.send(project)
        }
        catch (error) {
            next(error)
        }
    }

    async getAllProjects(req, res, next) {
        try {

            const projects = await projectsService.getAllProjects(req.userInfo.id)
            res.send(projects)
        }
        catch (error) {
            next(error)
        }
    }
}
