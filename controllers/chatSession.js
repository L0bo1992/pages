import { ChatSession } from '../models/chat.js';
import { v4 as uuidv4 } from 'uuid';




export const newChatSessions = async (req, res) => {
    try {
      const newSession = new ChatSession({ sessionId: uuidv4() });
      const savedSession = await newSession.save();
      res.status(201).json(savedSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create session' });
    }
  };
  
//   export const postChatSession = async (req, res) => {
//     try {
//       const { sessionId } = req.params;
//       const { sender, content } = req.body; // Ensure sender and content are directly in req.body
      
//       // Log the incoming request for debugging
//        // Log the incoming request for debugging
//     console.log('Request Params:', req.params);
//     console.log('Request Body:', req.body);
//     console.log('Sender:', sender);
//     console.log('Content:', content);
      
//       if (!sender || !content) {
//         return res.status(400).json({ error: 'Sender and content are required' });
//       }
      
//       // Create a new message object
//       const message = {
//         messageId: uuidv4(),
//         sender,
//         timestamp: new Date(),
//         content,
//       };
  
//       // Find the chat session by sessionId
//       const session = await ChatSession.findOne({ sessionId });
//       if (!session) {
//         return res.status(404).json({ error: 'Session not found' });
//       }
  
//       // Push the new message to the session's messages array
//       session.messages.push(message);
//       await session.save();
  
//       // Respond with the newly created message
//       res.status(201).json(message);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to send message' });
//     }
//   };
  
  


export const postChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { messages } = req.body; // Extract messages array from req.body
    
    // Log the incoming request for debugging
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);

    // Check if messages array is missing or empty
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Messages array is missing or empty in request:', req.body);
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const savedMessages = [];

    // Iterate over each message in the messages array
    for (let messageData of messages) {
      const { sender, content } = messageData;

      // Check if sender or content is missing or empty for each message
      if (!sender || !content) {
        console.error('Sender or content missing in message:', messageData);
        continue; // Skip this message and proceed with the next one
      }

      // Create a new message object
      const message = {
        messageId: uuidv4(),
        sender,
        timestamp: new Date(),
        content,
      };

      // Find the chat session by sessionId
      const session = await ChatSession.findOne({ sessionId });
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      // Push the new message to the session's messages array
      session.messages.push(message);
      await session.save();

      // Add the saved message to the array to be returned in the response
      savedMessages.push(message);
    }

    // Respond with the array of newly created messages
    res.status(201).json(savedMessages);
  } catch (error) {
    console.error('Error in postChatSession:', error);
    res.status(500).json({ error: 'Failed to send messages' });
  }
};






  export const getChatSession= async (req, res) => {
    try {
      const { sessionId } = req.params;
  
      const session = await ChatSession.findOne({ sessionId });
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      res.status(200).json(session.messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  };
  