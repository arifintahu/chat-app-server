import { createUserFunc, 
        findAllUserFunc,
        findUserByIDFunc,
        deleteUserByIDFunc,
        userLoginFunc } from "../main/user";
import { Request, Response } from "express";

export async function createUser(req: Request, res: Response){
    let data = req.body;
    if(!data.firstname || !data.lastname || !data.username || !data.password){
        res.status(400).send({
            ok : false,
            msg : "parameters are not satisfied"
        });
    }else{
        let response = await createUserFunc(data);
        if(!response){
            res.status(400).send({
                ok : false,
                msg : "username must be unique"
            });
        }else{
            res.send({
                ok : true,
                data : response
            });
        }
    }
};

export async function findAllUser(req: Request, res: Response){
    let response = await findAllUserFunc();
    res.send({
        ok : true,
        data : response
    });
};

export async function findUserByID(req: Request, res: Response){
    let id = req.params.groud_id;
    let response = await findUserByIDFunc(id);
    res.send({
        ok : true,
        data : response
    });
};

export async function deleteUserByID(req: Request, res: Response){
    let id = req.params.groud_id;
    let response = await deleteUserByIDFunc(id);
    res.send({
        ok : true,
        data : response
    });
};

export async function userLogin(req: Request, res: Response){
    let data = req.body;
    if(!data.username || !data.password ){
        res.status(400).send({
            ok : false,
            msg : "parameters are not satisfied"
        });
    }else{
        let response = await userLoginFunc(data);
        if(!response){
            res.status(400).send({
                ok : false,
                msg : "not found"
            });
        }else{
            res.send({
                ok : true,
                data : response
            });
        }
    }
};