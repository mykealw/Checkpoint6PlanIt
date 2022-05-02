import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  projectId: { type: String, ref: 'Project', required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

SprintSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})