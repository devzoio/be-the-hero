const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    //executar o banco antes dos testes
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    //executar após finalizar os testes
    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            //método da rota
            .post('/ongs')
            //quiser testar headers: .set('Authorization', ID)
            //quais dados quero testar
            .send({
                name: "Zika",
                email: "test@test.com",
                whatsapp: "00000000000",
                city: "SBC",
                uf: "SP"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})