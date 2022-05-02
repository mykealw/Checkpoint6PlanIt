import { get } from "express/lib/response";
import { projectsService } from "../services/ProjectsService.js";
import { sprintsService } from "../services/SprintsService.js";
import BaseController from '../utils/BaseController.js'

export class ProjectController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
        .post('', this.createProject)
            .get('', this.getAllProjects)
        .get('/:id', this.getProjectById)
        .get('/:projectId/sprints', this.getSprintsByProject)
        .delete('/:id', this.deleteProject)

    }
  async  getSprintsByProject(req, res, next) {
      try {
          const sprints = await sprintsService.getSprintsByProject(req.params.projectId)
          res.send(sprints)
      }
      catch(error) {
        next(error)
      }
    }
   async deleteProject(req, res, next) {
       try {
           const project = await projectsService.deleteProject(req.params.id)
           res.send(project)
       }
       catch(error) {
         next(error)
       }
    }
 async   createProject(req, res, next) {
       try {
           req.body.creatorId = req.userInfo.id
           const project = await projectsService.createProject(req.body)
            res.send(project)
       }
       catch(error) {
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
        }}

  async getAllProjects(req, res, next) {
            try {
                const projects = await projectsService.getAllProjects()
                res.send(projects)
            }
            catch (error) {
                next(error)
            }
        }
}