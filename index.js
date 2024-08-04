import express from "express";
import mongoose from "mongoose";
import chatSessionRouter from "./routes/chatSession.js";
import documentRouter from "./routes/documents.js";

// Connect to database
await mongoose.connect(process.env.MONGO_URL);

//Create express app
const app = express();

//use middleware
app.use(express.json());



//use routes
app.use(chatSessionRouter);
app.use(documentRouter);



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});