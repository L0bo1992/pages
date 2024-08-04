import { Types } from 'mongoose';
import { Document } from '../models/documents.js'; 
import { ChatSession } from '../models/chat.js';
import { v4 as uuidv4 } from 'uuid';

// Controller function to handle document upload
export const postDocument = async (req,res) => {
  try {
    // Retrieve the session ID from headers or cookies
    const sessionId = req.headers['x-session-id'] || req.cookies.sessionId;
    console.log(sessionId)
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    // Validate the session ID format
    if (!Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: 'Invalid session ID format' });
    }
    
    // Check if the chat session exists
    const chatSession = await ChatSession.findById(sessionId);
    if (!chatSession) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    // Extract document details from the request body
    const { filename, filePath } = req.body;
    
    // Create a new document
    const newDocument = new Document({
      documentId: uuidv4(), // Generate a unique document ID
      sessionId: sessionId, // Use the session ID retrieved earlier
      filename,
      filePath,
    });

    // Save the document
    const savedDocument = await newDocument.save();

    // Optionally, update the chat session to include the new document
    chatSession.documents.push(savedDocument._id);
    await chatSession.save();

    // Respond with the saved document
    res.status(201).json(savedDocument);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
};
