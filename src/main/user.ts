import { users } from "../odm";

export async function createUserFunc(data){
    let check = await users.exists({ username : data.username });
    if(check){
        return(false);
    }else{
        let result = await users.create(data);
        return(result);
    }
};

export async function findAllUserFunc(){
    let result = await users.find();
    return(result);
}

export async function findUserByIDFunc(id){
    let result = await users.findById(id);
    return(result);
}

export async function deleteUserByIDFunc(id){
    let result = await users.findByIdAndDelete(id);
    return(result);
}