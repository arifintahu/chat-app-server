import { createGroupFunc,
        findAllGroupFunc,
        findGroupByIDFunc,
        deleteGroupByIDFunc,
        enterGroupFunc } from "../main/group";
import { Request, Response } from "express";

export async function createGroup(req: Request, res: Response){
    let data = req.body;
    if(!data.groupname){
        res.status(400).send({
            ok : false,
            msg : "parameters are not satisfied"
        });
    }else{
        let response = await createGroupFunc(data);
        if(!response){
            res.status(400).send({
                ok : false,
                msg : "Groupname must be unique"
            });
        }else{
            res.send({
                ok : true,
                data : response
            });
        }
    }
};

export async function enterGroup(req: Request, res: Response){
    let data = req.body;
    if(!data.groupname){
        res.status(400).send({
            ok : false,
            msg : "parameters are not satisfied"
        });
    }else{
        let response = await enterGroupFunc(data);
        if(!response){
            res.status(400).send({
                ok : false,
                msg : "Groupname does not exist"
            });
        }else{
            res.send({
                ok : true,
                data : response
            });
        }
    }
};

export async function findAllGroup(req: Request, res: Response){
    let response = await findAllGroupFunc();
    res.send({
        ok : true,
        data : response
    });
};

export async function findGroupByID(req: Request, res: Response){
    let id = req.params.group_id;
    let response = await findGroupByIDFunc(id);
    res.send({
        ok : true,
        data : response
    });
};

export async function deleteGroupByID(req: Request, res: Response){
    let id = req.params.group_id;
    let response = await deleteGroupByIDFunc(id);
    res.send({
        ok : true,
        data : response
    });
};



