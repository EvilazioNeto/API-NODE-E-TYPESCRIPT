import { Knex } from "../../knex";
import { ETableNames } from "../../ETTableNames";

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .where('id', '=', id)
            .del();

        if (result > 0) return;
        return new Error('Erro ao deletar o registro');

    } catch (error) {
        console.log(error)
        return new Error('Erro ao deletar o registro');
    }
}