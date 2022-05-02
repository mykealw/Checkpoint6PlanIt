import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { NoteSchema } from '../models/Note.js';
import { TaskSchema } from '../models/Task.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Task = mongoose.model('Task', TaskSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Note = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
