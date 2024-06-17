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

        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/cidades/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Não pode atualizar registro com nome menor que 3 caracteres', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Ca' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })
    it('Não pode atualizar registro com nome maior que 32 caracteres', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Cidade Vila Bela da Santíssima Trindade' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })
    it('Não pode criar um registro com nome contendo apenas espaços', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: '    ' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })
    it('Não pode criar um registro com nome contendo caracteres especiais', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Tobias@#' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(resAtualizada.body).toHaveProperty('errors.body.nome')
    })
});