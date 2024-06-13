import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {
    it('Cria registro', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Tobias Barreto' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    });
    it('Não pode criar um registro com nome muito curto', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'To' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
    it('Não pode criar um registro com nome muito longo', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Cidade Vila Bela da Santíssima Trindade' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.nome')
    })
    it('Não pode criar um registro sem nome', async () => {
    
        const res1 = await testServer
            .post('/cidades')
            .send({});
    
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Não pode criar um registro com nome contendo apenas espaços', async () => {
    
        const res1 = await testServer
            .post('/cidades')
            .send({ nome: '    ' });
    
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
    it('Não pode criar um registro com nome contendo caracteres especiais', async () => {
    
        const res1 = await testServer
            .post('/cidades')
            .send({ nome: 'Tobias@#' });
    
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});