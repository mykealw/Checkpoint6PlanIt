import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        body: { type: String, required: true },
        taskId: { type: Schema.Types.ObjectId, required: true, ref: 'Task' },
        projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

NoteSchema.virtual('task', {
    localField: 'taskId',
    ref: 'Task',
    foreignField: '_id',
    justOne: true
})

NoteSchema.virtual('project', {
    localField: 'projectId',
    ref: 'Project',
    foreignField: '_id',
    justOne: true
})