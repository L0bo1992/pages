import express from "express";
import mongoose from "mongoose";
import chatSessionRouter from "./routes/chatSession.js";
import documentRouter from "./routes/documents.js";
import cookieParser from "cookie-parser";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import cors from "cors"



// Connect to database
await mongoose.connect(process.env.MONGO_URL);


// Create an app
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['chat-sessions', 'documents'],
    mongooseModels: mongoose.modelNames(),
});

// Use middlewares
//app.use(cors());
app.use(cors(
    {origin:'https://pages-client.netlify.app' }
));


app.use(express.json());
app.use(cookieParser()); // For parsing cookies



//use routes
app.use(chatSessionRouter);
app.use(documentRouter);
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});