
import { model, Schema,Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ChatSessionSchema = new Schema({
  
  sessionId: {
    type: String,
    default: uuidv4,  // Automatically generate a UUID for the session ID
    unique: true,
  },
  messages: [
    {
      messageId: {
        type: String,
        default: uuidv4,  // Automatically generate a UUID for each message ID
      },
      sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      content: {
        type: String,
        required: true,
      },
      documents: [{
        type: Types.ObjectId,
        ref: 'Document', // References the Document model
      }],
     
    },
  ],
});

export const ChatSession = model('ChatSession', ChatSessionSchema);

