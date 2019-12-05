import { groups } from "../odm";

export async function createGroupFunc(data){
    let check = await groups.exists({ groupname : data.groupname });
    if(check){
        return(false);
    }else{
        let result = await groups.create(data);
        return(result);
    }
};

export async function enterGroupFunc(data){
    let check = await groups.exists({ groupname : data.groupname });
    if(check){
        let result = await groups.find({
            groupname : data.groupname
        });
        return(result[0]);
    }else{
        return(false);
    }
};

export async function findAllGroupFunc(){
    let result = await groups.find();
    return(result);
};

export async function findGroupByIDFunc(id){
    let result = await groups.findById(id);
    return(result);
};

export async function deleteGroupByIDFunc(id){
    let result = await groups.findByIdAndDelete(id);
    return(result);
};