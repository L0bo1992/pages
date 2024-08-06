import { ChatSession } from '../models/chat.js';
import { v4 as uuidv4 } from 'uuid';
import Anthropic from '@anthropic-ai/sdk';




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
  





// Initialize the Claude AI SDK
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY // Ensure you have this in your .env file
});

export const postChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { messages } = req.body; // Extract messages array from req.body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const savedMessages = [];
    const session = await ChatSession.findOne({ sessionId });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    for (let messageData of messages) {
      const { sender, content } = messageData;

      if (!sender || !content) {
        console.error('Sender or content missing in message:', messageData);
        continue;
      }

      // Save user message
      const userMessage = {
        messageId: uuidv4(),
        sender,
        timestamp: new Date(),
        content,
      };
      session.messages.push(userMessage);
      savedMessages.push(userMessage);

      // If the message is from the user, send it to Claude AI for a response
      if (sender === 'user') {
        try {
          const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1024,
            messages: [{ role: "user", content: content }],
          });


           // Log the entire AI response for debugging
           console.log('AI Response:', response);

          // Check if response contains the messages field and has at least one message
        //   if (response && Array.isArray(response.messages) && response.messages.length > 0) 
        if (response && Array.isArray(response.content) && response.content.length > 0) 

            {
            const botMessage = {
              messageId: uuidv4(),
              sender: 'bot',
              timestamp: new Date(),
              content: response.content[0]?.text || 'Sorry, I did not understand.',
            };

            // Save bot message
            session.messages.push(botMessage);
            savedMessages.push(botMessage);
          } else {
            // Handle case where AI response doesn't have expected messages
            const botMessage = {
              messageId: uuidv4(),
              sender: 'bot',
              timestamp: new Date(),
              content: 'Sorry, I did not receive a valid response.',
            };
            session.messages.push(botMessage);
            savedMessages.push(botMessage);
          }
        } catch (aiError) {
          console.error('Error from Claude AI:', aiError);
          const errorMessage = {
            messageId: uuidv4(),
            sender: 'bot',
            timestamp: new Date(),
            content: 'Sorry, there was an error processing your request.',
          };
          session.messages.push(errorMessage);
          savedMessages.push(errorMessage);
        }
      }
    }

    await session.save();
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
  