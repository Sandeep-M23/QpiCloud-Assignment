import express from "express";
import http from "http";
import cors from 'cors';
import db from "./models/index.js";
import router from "./routes/index.js";
import * as dotenv from "dotenv";
import * as socketio from "socket.io";
import { lineData,barData,pieData,areaData } from "./Data/ChartData.js";

dotenv.config();

const port = 4001;

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(router);

db.mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("during");
        console.log("Successfully connect to MongoDB.");
        // initial();
    })
    .catch((err) => {
        console.error("Connection error:", err);
        process.exit();
    });

const httpServer = http.createServer(app);

const server = new socketio.Server(httpServer, {
    cors: {
        origin: "*",
    },
});

let timeChange;

server.on("connection", (socket) => {
    console.log("connection");
    if (timeChange) clearInterval(timeChange);

    if (lineData.length > 5) {
        lineData.reverse().pop();
        lineData.reverse();
    }

    lineData.push({
        name: lineData[lineData.length - 1].name + 1,
        x: Math.random() * 10,
        y: Math.random() * 10,
    });
    areaData.forEach((item) => {
        item.x = Math.floor(Math.random() * 8000);
        item.y = Math.floor(Math.random() * 5000);
        item.amt = Math.floor(Math.random() * 2000);
    });
    barData.forEach((item) => {
        item.x = Math.floor(Math.random() * 8000);
        item.y = Math.floor(Math.random() * 5000);
        item.amt = Math.floor(Math.random() * 2000);
    });
    pieData.forEach((item) => {
        item.value = Math.random() * 100;
    });

    setInterval(() => {
        socket.emit("data",barData,lineData,areaData,pieData)
    }, 4000);
});

httpServer.listen(port);
