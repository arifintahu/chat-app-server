import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as socketIo from "socket.io";
import { Server } from "net";
import { createUser, 
        findAllUser,
        findUserByID,
        deleteUserByID,
        userLogin } from "./services/user.service";
import { createGroup,
        findAllGroup,
        findGroupByID,
        deleteGroupByID,
        enterGroup } from "./services/group.service";
import { createMsg,
        findAllMsg,
        findAllMsgByGroupID } from "./services/msg.service";

const CHAT_PORT = process.env.PORT || 3000;
const app = express();

app.set("port", CHAT_PORT);
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/login", userLogin);

app.post("/users", createUser);
app.get("/users", findAllUser);
app.get("/users/:user_id", findUserByID);
app.delete("/users/:user_id", deleteUserByID);

app.post("/groups", createGroup);
app.post("/groups/enter", enterGroup);
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

io.on("connection", (socket) => {
    // Log whenever a user connects
    console.log("user connected");

    // Log whenever a client disconnects from our websocket server
    socket.on("disconnect", function() {
        console.log("user disconnected");
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on("message", message => {
        console.log(JSON.parse(message));
        io.emit("message", message);
    });
});

export function startServer(): Server {
    return server.listen(CHAT_PORT, () => {
        console.log("Server is running on ", CHAT_PORT);
    });
}
