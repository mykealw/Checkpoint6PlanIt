import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
    constructor() {
        super('api/projects/:projectId/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNote)
            .delete('/:id', this.deleteNote)

    }
    async createNote(req, res, next) {
        try {
            req.body.projectId = req.params.projectId
            req.body.creatorId = req.userInfo.id
            const note = await notesService.createNote(req.body)
            return res.send(note)
        } catch (error) {
            next(error)
        }
    }
    async deleteNote(req, res, next) {
        try {
            const deletedNote = await notesService.deletedNote(req.params.id)
            return res.send(deletedNote)
        } catch (error) {
            next(error)
        }
    }
}
