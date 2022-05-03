import { dbContext } from "../db/DbContext.js";

class SprintsService {
    async deleteSprint(sprintId) {
        const sprint = await dbContext.Sprints.findByIdAndDelete(sprintId)
        return sprint
    }
    async getSprintsByProject(projectId) {
        const sprints = await dbContext.Sprints.find({ projectId: projectId })
        return sprints
    }
    async createSprint(body) {
        const sprint = await dbContext.Sprints.create(body)
        // await sprint.populate('project', 'name _id')
        await sprint.populate('creator')
        return sprint
    }


}

export const sprintsService = new SprintsService()