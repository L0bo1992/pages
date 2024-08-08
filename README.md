# Chatbot Project with Claude AI Integration

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Usage](#usage)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)


## Introduction

This project is a chatbot application that uses the Claude AI service for generating responses to user messages. The chatbot supports creating new chat sessions, posting messages to a session, and retrieving messages from a session. The backend is built with Node.js and MongoDB.

## Features

- Create new chat sessions.
- Post messages to a chat session.
- Retrieve messages from a chat session.
- AI-powered responses using Claude AI.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Claude AI via Anthropic SDK
- UUID for unique identifiers

## Setup and Installation

1. **Clone the repository:**

    git clone https://github.com/yourusername/chatbot-project.git
    cd chatbot-project

2. **Install dependencies:**

    npm install

3. **Set up environment variables:** (See [Environment Variables](#environment-variables) section)

4. **Start the server:**

    npm start

## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

    ANTHROPIC_API_KEY=your_claude_ai_api_key
    MONGO_URI=your_mongodb_connection_string

## API Endpoints

### Create a New Chat Session

- **Endpoint:** `POST /api/chat-sessions`
- **Description:** Creates a new chat session.
- **Response:**
  - `201 Created` with the new session details.
  - `500 Internal Server Error` if the session could not be created.

### Post Messages to a Chat Session

- **Endpoint:** `POST /api/chat-sessions/:sessionId/messages`
- **Description:** Posts messages to a chat session and gets responses from Claude AI.
- **Request Body:**

    {
      "messages": [
        {
          "sender": "user",
          "content": "Hello, how are you?"
        }
      ]
    }

- **Response:**
  - `201 Created` with the saved messages (including AI responses).
  - `400 Bad Request` if the messages array is missing or empty.
  - `404 Not Found` if the session is not found.
  - `500 Internal Server Error` if there was an error processing the messages.

### Retrieve Messages from a Chat Session

- **Endpoint:** `GET /api/chat-sessions/:sessionId/messages`
- **Description:** Retrieves all messages from a chat session.
- **Response:**
  - `200 OK` with the messages.
  - `404 Not Found` if the session is not found.
  - `500 Internal Server Error` if there was an error retrieving the messages.

## Usage

1. **Create a new chat session:**

    POST /api/chat-sessions

2. **Post messages to a chat session:**

    POST /api/chat-sessions/:sessionId/messages

3. **Retrieve messages from a chat session:**

    GET /api/chat-sessions/:sessionId/messages

## Testing

You can use tools like [ThunderClient](https://www.thunderclient.com/) or [Postman](https://www.postman.com/) to test the API endpoints.

1. **Create a new chat session:**
   - Send a `POST` request to `/api/chat-sessions`.

2. **Post messages to a chat session:**
   - Send a `POST` request to `/api/chat-sessions/:sessionId/messages` with a JSON body containing the messages.

3. **Retrieve messages from a chat session:**
   - Send a `GET` request to `/api/chat-sessions/:sessionId/messages`.

## Troubleshooting

- **Error: `Cannot read properties of undefined (reading '0')`:**
  - Ensure the AI response has the expected structure with `content` being an array containing at least one object.
  - Check if your API key for Claude AI is valid and has sufficient credits.

- **Database connection issues:**
  - Verify your MongoDB connection string in the `.env` file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.



