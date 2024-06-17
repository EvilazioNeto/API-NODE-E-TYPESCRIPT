import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {
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

    it('Cria pessoa', async () => {
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

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    });
    it('Não pode criar um registro com nome muito curto', async () => {
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
                nome: "E",
                sobrenome: "Neto",
                email: "evilazio@gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    });
    it('Não pode criar um registro com nome muito longo', async () => {
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
                nome: "Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio Evilazio",
                sobrenome: "Neto",
                email: "evilazio@gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    });
    it('Não pode criar um registro com um sobrenome muito curto', async () => {
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
                sobrenome: "N",
                email: "evilazio@gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.sobrenome')
    });
    it('Não pode criar um registro com um sobrenome muito longo', async () => {
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
                sobrenome: "Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto Neto ",
                email: "evilazio@gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.sobrenome')
    });
    it('Não pode criar um registro com um email inválido', async () => {
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
                email: "evilazio%gmail.com",
                cpf: "55555555555",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    });
    it('Não pode criar um registro com um cpf inválido', async () => {
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
                cpf: "cpf",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cpf')
    });
    it('Não pode criar um registro com o id de cidade inválido (string)', async () => {
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
                email: "evilazio%gmail.com",
                cpf: "11111111111",
                cidadeId: "id"
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cidadeId')
    });
    it('Não pode criar um registro com o id de cidade inválido (decimal/racional)', async () => {
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
                cpf: "11111111111",
                cidadeId: 1.5
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cidadeId')
    });
    it('Não pode criar um registro sem o nome', async () => {
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
                sobrenome: "Neto",
                email: "evilazio@gmail.com",
                cpf: "11111111111",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    });
    it('Não pode criar um registro sem o sobrenome', async () => {
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
                email: "evilazio@gmail.com",
                cpf: "11111111111",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.sobrenome')
    });
    it('Não pode criar um registro sem o email', async () => {
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
                cpf: "11111111111",
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.email')
    });
    it('Não pode criar um registro sem o cpf', async () => {
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
                cidadeId: cidade.body
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cpf')
    });
    it('Não pode criar um registro sem o cidadeId', async () => {
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
                email: "eee@gmail.com",
                cpf: "11111111111"
            })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.cidadeId')
    })
})