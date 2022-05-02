import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
    {
        name: { type: String, required: true },
        weight: { type: Number, required: true },
        projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
        sprintId: { type: Schema.Types.ObjectId, required: true, ref: 'Sprint' },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TaskSchema.virtual('sprint', {
    localField: 'sprintId',
    foreignField: '_id',
    ref: 'Sprint',
    justOne: true
})

TaskSchema.virtual('project', {
    localField: 'projectId',
    foreignField: '_id',
    ref: 'Project',
    justOne: true
})