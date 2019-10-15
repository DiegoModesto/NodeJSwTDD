const request = require('supertest')
const faker = require('faker')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

const factory = require('../factories')

describe('PointerMarker', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should can take user_id from bearer before create markpointer', async () => {
        const user = await factory.create('UserFactory')
    })

    it('should can possible create pointer with user_id', async () => {
        const user = await factory.create('UserFactory')
        const mark = await factory.create('MarkFactory', {
            user_id: user.id
        })


        const response = await request(app)
            .post('mark/create')
            .send({

            })
            .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200)
    })
})