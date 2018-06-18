import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Seller } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, seller

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  seller = await Seller.create({})
})

test('POST /sellers 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, email: 'test', name: 'test', address: 'test', name: 'test', storeId: 'test', categories: 'test', communcation: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.storeId).toEqual('test')
  expect(body.categories).toEqual('test')
  expect(body.communcation).toEqual('test')
})

test('POST /sellers 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /sellers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /sellers 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /sellers 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /sellers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /sellers/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${seller.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(seller.id)
})

test('GET /sellers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${seller.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /sellers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${seller.id}`)
  expect(status).toBe(401)
})

test('GET /sellers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /sellers/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${seller.id}`)
    .send({ access_token: adminSession, email: 'test', name: 'test', address: 'test', name: 'test', storeId: 'test', categories: 'test', communcation: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(seller.id)
  expect(body.email).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.storeId).toEqual('test')
  expect(body.categories).toEqual('test')
  expect(body.communcation).toEqual('test')
})

test('PUT /sellers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${seller.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /sellers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${seller.id}`)
  expect(status).toBe(401)
})

test('PUT /sellers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, email: 'test', name: 'test', address: 'test', name: 'test', storeId: 'test', categories: 'test', communcation: 'test' })
  expect(status).toBe(404)
})

test('DELETE /sellers/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${seller.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /sellers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${seller.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /sellers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${seller.id}`)
  expect(status).toBe(401)
})

test('DELETE /sellers/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
