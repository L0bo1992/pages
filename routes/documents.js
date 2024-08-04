import { Router } from "express";
import { postDocument } from "../controllers/documents.js";
import { remoteUpload } from "../middlewares/uploads.js";


const documentRouter = Router();

documentRouter.post('/api/documents', remoteUpload.single('filePath'), postDocument);

export default documentRouter