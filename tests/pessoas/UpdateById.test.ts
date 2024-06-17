import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - UpdateById', () => {
    let accessToken = '';
    beforeAll(async () => {
        const email = 'create2-cidades@gmail.com';
        await testServer.post('/cadastrar').send({
            nome: 'Teste',
            email,
            senha: '12345678'
        })
        const signInRes = await testServer.post('/entrar').send({ email, senha: '12345678' })

        accessToken = signInRes.body.accessToken;
    });

    it('Atualiza registro', async () => {

        const cidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Tobias Barreto' })

        expect(cidade.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof cidade.body).toEqual('number')

        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Evilazio",
                sobrenome: "Neto",
                email: "evilazio@gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Maria",
                sobrenome: "Silva",
                email: "maria@gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    })
    it('Tenta atualizar um registro que não existe', async () => {
        const res1 = await testServer
            .put('/pessoas/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                nome: "Evilazio",
                sobrenome: "Neto",
                email: "evilazio@gmail.com",
                cpf: "55555555555",
                cidadeId: 5
            })

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })
})