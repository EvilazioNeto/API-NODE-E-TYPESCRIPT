import { ICidade, IPessoa, IUsuario } from "../../models";

declare module 'knex/types/tables' {
    interface tables {
        cidade : ICidade,
        pessoa: IPessoa,
        usuario: IUsuario
    }
}