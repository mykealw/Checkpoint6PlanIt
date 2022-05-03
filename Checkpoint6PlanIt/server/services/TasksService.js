import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class TasksService {
  async getTasksById(id) {
    const task = await dbContext.Tasks.findById(id)
    if (!task) {
      throw new BadRequest('Invalid Task')
    }
    return task
  }
  async editTask(update) {
    const original = await this.getTasksById(update.id)
    original.name = update.name || original.name
    original.weight = update.weight || original.weight
    original.projectId = update.projectId || original.projectId
    original.sprintId = update.sprintId || original.sprintId
    original.isComplete = update.isComplete || original.isComplete
    await original.save()
    return original
  }
  async deleteTask(TaskId) {
    const task = await dbContext.Tasks.findByIdAndDelete(TaskId)
    return task
  }
  async getTasksByProject(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId: projectId })
    return tasks
  }
  async createTask(body) {
    const task = await dbContext.Tasks.create(body)
    await task.populate('creator', 'name picture')
    return task
  }



}

export const tasksService = new TasksService()