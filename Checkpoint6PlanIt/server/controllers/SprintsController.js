import { sprintsService } from "../services/SprintsService.js";
import BaseController from "../utils/BaseController.js";

export class SprintsController extends BaseController {
    constructor() {
        super('api/projects/:projectId/sprints')
        this.router
            .post('', this.createSprint)
            .delete('/:id', this.deleteSprint)


    }
    async deleteSprint(req, res, next) {
        try {
            const sprint = await sprintsService.deleteSprint(req.params.id)
            res.send(sprint)
        }
        catch (error) {
            next(error)
        }
    }
    async createSprint(req, res, next) {
        try {
            const sprint = await sprintsService.createSprint(req.body)
            res.send(sprint)
        }
        catch (error) {
            next(error)
        }
    }



}