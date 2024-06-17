import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {
    let accessToken = '';
    beforeAll(async () =>{
        const email = 'create-cidades@gmail.com';
        await testServer.post('/cadastrar').send({
            nome: 'Teste', 
            email,
            senha: '12345678'
        })
        const signInRes = await testServer.post('/entrar').send({email, senha: '12345678'})

        accessToken = signInRes.body.accessToken;
    });

    it('Cria registro', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Tobias Barreto' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    });
    it('Tenta criar registro sem token de acesso', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Tobias Barreto' });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(res1.body).toHaveProperty('errors.default')
    });
    it('Não pode criar um registro com nome muito curto', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'To' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
    it('Não pode criar um registro com nome muito longo', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Cidade Vila Bela da Santíssima Trindade' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
    it('Não pode criar um registro sem nome', async () => {
    
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({});
    
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Não pode criar um registro com nome contendo apenas espaços', async () => {
    
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({ nome: '    ' });
    
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Não pode criar um registro com nome contendo caracteres especiais', async () => {
    
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Tobias@#' });
    
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});