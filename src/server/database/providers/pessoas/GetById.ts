import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getById = async (id: number): Promise<IPessoa | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;

        return new Error(`Erro ao buscar registro com ID ${id}`);
    } catch (error) {
        console.error(`Erro ao buscar registro com ID ${id}:`, error);
        return new Error(`Erro ao buscar registro com ID ${id}`);
    }
}