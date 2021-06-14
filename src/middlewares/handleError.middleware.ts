import {Request, Response, NextFunction } from "express";
import ErroHandler from "../helpers/error.helper";

const handlerError = (error:Error, req: Request, res: Response, _: NextFunction) =>{
    if(error instanceof ErroHandler){
        return res.status(error.status).json({
            status: error.name,
            message: error.message,
            stack: error.stack
        });
    }

    console.error(error.message);

    return res.status(500).json({
          status: 'Error',
          stack: error.message,
          message: 'Internal server error',

    });
}

export default handlerError;