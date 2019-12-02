import { msg, groups, users } from "../odm";

export async function createMsgFunc(data){
    try{
        let check_user = await users.exists({ _id : data.user_id });
        let check_group = await groups.exists({ _id : data.group_id });
        if(check_user && check_group){
            let result = await msg.create(data);
            return(result);
        }else{
            return(false);
        }
    }catch (e){
        return(false);
    }
};

export async function findAllMsgFunc(){
    let result = await msg.find();
    return(result);
};

export async function findAllMsgByGroupIDFunc(groupID){
    let result = await msg.find({
        group_id : groupID
    });
    return(result);
};