import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as socketIo from "socket.io";
import { Server } from "net";
import { createUser, 
        findAllUser,
        findUserByID,
        deleteUserByID } from "./services/user.service";
import { createGroup,
        findAllGroup,
        findGroupByID,
        deleteGroupByID } from "./services/group.service";
import { createMsg,
        findAllMsg,
        findAllMsgByGroupID } from "./services/msg.service";

const CHAT_PORT = process.env["CHAT_PORT"] || 3000;
const app = express();

app.set("port", CHAT_PORT);
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/users", createUser);
app.get("/users", findAllUser);
app.get("/users/:userid", findUserByID);
app.delete("/users/:userid", deleteUserByID);

app.post("/groups", createGroup);
app.get("/groups", findAllGroup);
app.get("/groups/:group_id", findGroupByID);
app.delete("/groups/:group_id", deleteGroupByID);

app.post("/messages", createMsg);
app.get("/messages", findAllMsg);
app.get("/messages/:group_id", findAllMsgByGroupID);

app.get("*", (req, res) => {
    res.status(404).json({
        ok : false,
        msg : "invalid route",
    });
});

const server = http.createServer(app);
const io = socketIo(server);



export function startServer(): Server {
    return server.listen(CHAT_PORT, () => {
        console.log("Server is running on ", CHAT_PORT);
        io.on("connection", (socket) => {
            console.log("A user has connected");
            socket.emit("hello", {
                greeting : "Hello boy!"
            });
        });
    });
}
