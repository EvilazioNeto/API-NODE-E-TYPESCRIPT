import type { Knex } from "knex";
import { ETableNames } from "../ETTableNames";

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.cidade, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome', 32).checkLength('<=', 32).index().notNullable();
            table.comment('Tabela usada para armazenar cidades do sistema')
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.cidade}`)
        })
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.cidade)
        .then(()=>{
            console.log(`# Dropped table ${ETableNames.cidade}`)
        })
}
