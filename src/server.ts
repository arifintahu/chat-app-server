import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as http from "http";
import { Server } from "net";

const CHAT_PORT = process.env["CHAT_PORT"] || 3000;
const app = express();

app.set("port", CHAT_PORT);
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("*", (req, res) => {
    res.status(404).json({
        ok : false,
        msg : "invalid route",
    });
});

const server = http.createServer(app);

export function startServer(): Server {
    return server.listen(CHAT_PORT, () => {
        console.log("Server is running on ", CHAT_PORT);
    });
}
