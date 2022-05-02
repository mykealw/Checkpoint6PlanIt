import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { NoteSchema } from '../models/Note.js';
import { ProjectSchema } from '../models/Project.js';
import { SprintSchema } from '../models/Sprint.js';
import { TaskSchema } from '../models/Task.js';
import { ValueSchema } from '../models/Value';


class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Notes = mongoose.model('Note', NoteSchema);
  Projects = mongoose.model('Project', ProjectSchema)
  Sprints = mongoose.model('Sprint', SprintSchema)
}

export const dbContext = new DbContext()
