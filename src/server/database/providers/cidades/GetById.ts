import { ETableNames } from "../../ETTableNames"
import { Knex } from "../../knex"
import { ICidade } from "../../models";

export const getById = async (id: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*') // posso especificar qual atributo mandar no return
            .where('id', '=', id)
            .first();

        if (result) return result;
         
        return new Error(`Erro ao buscar registro com ID ${id}`);
    } catch (error) {
        console.error(`Erro ao buscar registro com ID ${id}:`, error);
        return new Error(`Erro ao buscar registro com ID ${id}`);
    }
};
