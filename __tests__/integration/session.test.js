const request = require('supertest')
const faker = require('faker')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

const factory = require('../factories')

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('UserFactory', {
            password: "123123"
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            })

        expect(response.status).toBe(200)
    })

    it('shoult not authenticate with invalid credentials', async () => {
        const user = await factory.create('UserFactory', {
            password: "123123"
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        expect(response.status).toBe(401)
    })

    it('should return JWT token when authenticate', async () => {
        const user = await factory.create('UserFactory', {
            password: "123123"
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })

        expect(response.body).toHaveProperty('token')
    })

    it('should be able to access private routes when authenticated', async () => {
        const user = await factory.create('UserFactory', {
            password: "123123"
        })

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`)
        
        expect(response.status).toBe(200)
    })

    it('should not be able to access priate routes when not authenticated', async () => {
        const response = await request(app)
            .get('/dashboard')

        expect(response.status).toBe(401)
    })

    it('should not be able access private routes with invalid JWT', async () => {
        const response = await request(app)
            .get('/dashboard')
            .set('Autorization', `Bearer testinvalidtoken`)


        expect(response.status).toBe(401)
    })

    //User creation
    it('should return JWT when user is created', async () => {
        const fakePassword = faker.internet.password()
        const fakeUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: fakePassword,
            retype_password: fakePassword
        }
        console.log('User =>>>>>>>>>>>>>>>>>>>>>>>>>', fakeUser)
        const response = await request(app)
            .post('/sessions/create')
            .send(fakeUser)

        console.log('Response =>>>>>>>>>>>>>>>>>>>>>>', response.body)
        
        expect(response.body).toHaveProperty('token')
    })
})