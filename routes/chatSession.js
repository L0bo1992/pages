import { Router } from "express";
import {
  getChatSession,
  newChatSessions,
  postChatSession,
} from "../controllers/chatSession.js";

const chatSessionRouter = Router();

chatSessionRouter.post("/chat-sessions", newChatSessions);

chatSessionRouter.post("/chat-sessions/:sessionId/messages", postChatSession);

chatSessionRouter.get("/chat-sessions/:sessionId/messages", getChatSession);

export default chatSessionRouter;