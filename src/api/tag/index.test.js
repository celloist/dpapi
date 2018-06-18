import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Tag } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, tag

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  tag = await Tag.create({})
})

test('POST /tags 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.category).toEqual('test')
})

test('POST /tags 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /tags 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tags 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /tags/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tag.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
})

test('GET /tags/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /tags/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tag.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tag.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.category).toEqual('test')
})

test('PUT /tags/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tag.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /tags/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tag.id}`)
  expect(status).toBe(401)
})

test('PUT /tags/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tags/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tag.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /tags/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tag.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /tags/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tag.id}`)
  expect(status).toBe(401)
})

test('DELETE /tags/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
