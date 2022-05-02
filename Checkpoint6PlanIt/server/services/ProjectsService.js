import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class ProjectsService {
  async deleteProject(projectId) {
    const project = await this.getProjectById(projectId)
    await dbContext.Projects.findByIdAndDelete(projectId)
    return project
  }
  async createProject(body) {
    const project = await dbContext.Projects.create(body)
    // populate?? 
    return project
  }
  async getProjectById(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name')
    if (!project) {
      throw new BadRequest('Invalid Id')
    }
    return project
  }
  async getAllProjects() {
    const projects = await dbContext.Projects.find({})
    return projects
  }


}

export const projectsService = new ProjectsService()