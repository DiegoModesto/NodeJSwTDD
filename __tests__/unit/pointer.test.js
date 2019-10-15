const request = require('supertest')
const app = require('../../src/app')
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('Pointer', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should have user_id before create it', async () => {
        const user = await factory.create('UserFactory', {
            email: 'diegosanches89@gmail.com'
        })

        const response = await request(app)
            .post('/mark/create')
            .send({
                name: user.name,
                email: user.email,
                password: user.password,
                retype_password: user.password
            })

        expect(response.status).toBe(500)
    })
})