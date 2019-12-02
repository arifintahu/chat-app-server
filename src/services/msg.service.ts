import { createMsgFunc,
        findAllMsgFunc,
        findAllMsgByGroupIDFunc } from "../main/msg";
import { Request, Response } from "express";

export async function createMsg(req: Request, res: Response){
    let data = req.body;
    if(!data.group_id || !data.user_id || !data.message){
        res.status(400).send({
            ok : false,
            msg : "parameters are not satisfied"
        });
    }else{
        let response = await createMsgFunc(data);
        if(!response){
            res.status(400).send({
                ok : false,
                msg : "group_id and user_id must be valid"
            });
        }else{
            res.send({
                ok : true,
                data : response
            });
        }
    }
};

export async function findAllMsg(req: Request, res: Response){
    let response = await findAllMsgFunc();
    res.send({
        ok : true,
        data : response
    });
};

export async function findAllMsgByGroupID(req: Request, res: Response){
    let groupID = req.params.group_id;
    let response = await findAllMsgByGroupIDFunc(groupID);
    res.send({
        ok : true,
        data : response
    });
};

