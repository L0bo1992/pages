import { model, Schema,Types } from "mongoose";

import { v4 as uuidv4 } from "uuid";

const DocumentSchema = new Schema({
  documentId: {
    type: String,
    default: uuidv4, // Automatically generate a UUID for the document ID
    unique: true,
  },
  sessionId: {
    type: String,
    required: true, // Store the session ID to which the document belongs
  },
  filename: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  uploadTimestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Document = model("Document", DocumentSchema);
