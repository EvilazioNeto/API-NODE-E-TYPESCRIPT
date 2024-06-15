import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - DeleteById', () => {
    it('Apaga registro', async () => {
        const cidade = await testServer
            .post('/cidades')
            .send({ nome: 'Tobias Barreto' })

        expect(cidade.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof cidade.body).toEqual('number')

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: "Evilazio",
                sobrenome: "Neto",
                email: "evilazio@gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number');

        const deletarRegistro = await testServer
            .delete(`/pessoas/${res1.body}`)
            .send();

        expect(deletarRegistro.statusCode).toEqual(StatusCodes.NO_CONTENT)
    });
    it('Tenta apagar registro que não existe', async () => {
        const deletarRegistro = await testServer
            .delete(`/pessoas/99999`)
            .send();

        expect(deletarRegistro.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(deletarRegistro.body).toHaveProperty('errors.default');
    })
})