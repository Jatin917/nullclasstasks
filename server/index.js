import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userroutes from "./routes/user.js"
import questionroutes from "./routes/question.js"
import answerroutes from "./routes/answer.js"
import Connection from "./database/db.js"
import mediaRoutes from './routes/mediaRoutes.js'
import path from 'path'
import { fileURLToPath } from "url";
import { translator } from "./controller/translator.js"

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user", userroutes);
app.use('/questions', questionroutes)
app.use('/answer',answerroutes)
app.use('/media', mediaRoutes)
app.get('/translate', translator);
app.get('/', (req, res) => {
    res.send("Codequest is running perfect")
})

const PORT = process.env.PORT || 5000
const database_url = process.env.MONGODB_URL

Connection(database_url);
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})