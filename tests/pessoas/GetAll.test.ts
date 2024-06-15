import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetAll', () => {
  it('Buscar todos os registros', async () => {

    const cidade = await testServer
      .post('/cidades')
      .send({ nome: 'Caxias do sul' })
      
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
      expect(typeof res1.body).toEqual('number')

      const resBuscada = await testServer
      .get('/pessoas')
      .send();


    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});