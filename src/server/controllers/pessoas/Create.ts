import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import * as yup from 'yup';

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(2).max(80),
        sobrenome: yup.string().required().min(2).max(80),
        email: yup.string().required().max(100).matches(/\S+@\S+\.\S+/),
        cpf: yup.string().required().length(11),
        cidadeId: yup.number().required().integer().positive()
    }))
}));


export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
    const result = await PessoasProvider.create(req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }
    return res.status(StatusCodes.CREATED).json(result)
}