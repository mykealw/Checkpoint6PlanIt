import { tasksService } from "../services/TasksService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class TasksController extends BaseController {
    constructor() {
        super('api/projects/:projectId/tasks')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:id', this.getTaskById)
            .post('', this.createTask)
            .delete('/:id', this.deleteTask)
            .put('/:id', this.editTask)


    }
    async getTaskById(req, res, next) {
        try {
            const task = await tasksService.getTasksById(req.params.id)
            res.send(task)
        }
        catch (error) {
            next(error)
        }
    }
    async editTask(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorId = req.userInfo.id
            const task = await tasksService.editTask(req.body)
            return res.send(task)
        }
        catch (error) {
            next(error)
        }
    }
    async deleteTask(req, res, next) {
        try {
            const task = await tasksService.deleteTask(req.params.id)
            res.send(task)
        }
        catch (error) {
            next(error)
        }
    }
    async createTask(req, res, next) {
        try {
            const task = await tasksService.createTask(req.body)
            res.send(task)
        }
        catch (error) {
            next(error)
        }
    }



}
