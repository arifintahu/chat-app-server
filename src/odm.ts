import * as mongoose from "mongoose";

//Config
const dbConfig = {
    url : "mongodb://localhost:27017/chat-app"
};
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String
}, {
    timestamps : true
});

const GroupSchema = new Schema({
    groupname : String
}, {
    timestamps : true
});

const MsgSchema = new Schema({
    group_id : String,
    user_id : String,
    message : String
});

export const users = mongoose.model("User", UserSchema);
export const groups = mongoose.model("Group", GroupSchema);
export const msg = mongoose.model("Msg", MsgSchema);

export function syncDB(){
    return new Promise((resolve, reject) => {
        mongoose.connect(dbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Successfully connected to the database");
            resolve(true);    
        }).catch(err => {
            console.log("Could not connect to the database. Exiting now..." + err);
            reject(false);
        });
    });
}
