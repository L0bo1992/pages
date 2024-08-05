import { Types } from 'mongoose';
import { Document } from '../models/documents.js'; 
import { ChatSession } from '../models/chat.js';
import { v4 as uuidv4 } from 'uuid';




export const postDocument = async (req, res) => {
    try {
    //   // Debugging statement to log incoming headers and cookies
    //   console.log('Request headers:', req.headers);
    //   console.log('Request cookies:', req.cookies);
    //   console.log('Request body:', req.body);
    //   console.log('Uploaded file:', req.file);
      
      // Retrieve session ID from headers or cookies
      const sessionId = req.headers['x-session-id'] || req.cookies.sessionId;
      
      // Check if sessionId is undefined
      if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
      }
  
      // Check if chat session exists
      const chatSession = await ChatSession.findOne({ sessionId });
      if (!chatSession) {
        return res.status(404).json({ error: 'Chat session not found' });
      }
  
      // Extract document details from the request body
      const { filename } = req.body;
    const filePath = req.file ? req.file.path : undefined;
    

      // Log for debugging
    //   console.log('Filename:', filename);
      console.log('File Path:', filePath);

      if (!filename || !filePath) {
        console.error('Missing filename or filePath:', { filename, filePath });
        return res.status(400).json({ error: 'Filename and filePath are required' });
      }
  
      // Create a new document
      const newDocument = new Document({
        documentId: uuidv4(),
        sessionId,
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
  

