import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";
import { AccountSchema } from "../models/Account.js";

class ProjectsService {
  async deleteProject(projectId) {
    const project = await this.getProjectById(projectId)
    await dbContext.Projects.findByIdAndDelete(projectId)
    return project
  }
  async createProject(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator')
    return project
  }
  async getProjectById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator')
    if (!project) {
      throw new BadRequest('Invalid Id')
    }
    return project
  }
  async getAllProjects(accountId) {

    const projects = await dbContext.Projects.find({ creatorId: accountId }).populate('creator')
    return projects
  }


}

export const projectsService = new ProjectsService()