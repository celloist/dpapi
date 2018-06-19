import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Enums } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, enums

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  enums = await Enums.create({})
})

test('POST /enums 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', values: ['test'] })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.values).toEqual('test')
})

test('POST /enums 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /enums 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /enums 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /enums/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${enums.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(enums.id)
})

test('GET /enums/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /enums/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${enums.id}`)
    .send({ access_token: adminSession, name: 'test', values: ['test'] })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(enums.id)
  expect(body.name).toEqual('test')
  expect(body.values).toEqual('test')
})

test('PUT /enums/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${enums.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /enums/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${enums.id}`)
  expect(status).toBe(401)
})

test('PUT /enums/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', values: ['test'] })
  expect(status).toBe(404)
})

test('DELETE /enums/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${enums.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /enums/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${enums.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /enums/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${enums.id}`)
  expect(status).toBe(401)
})

test('DELETE /enums/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
