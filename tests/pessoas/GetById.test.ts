import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetById', () => {
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
    
    it('Buscar registro por ID', async () => {
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
        expect(typeof res1.body).toEqual('number');

        const resBuscada = await testServer
            .get(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('id');
    }),
    it('Tenta buscar registro que não existe', async () => {

        const res1 = await testServer
          .get('/pessoas/99999')
          .set({ Authorization: `Bearer ${accessToken}` })
          .send();
    
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
      });
});