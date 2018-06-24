import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Order } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, order

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  order = await Order.create({})
})

test('POST /orders 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ orderId: 'test', user: 'test', products: 'test', vat: 'test', shipping: 'test', total: 'test', payed: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.orderId).toEqual('test')
  expect(body.user).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.vat).toEqual('test')
  expect(body.shipping).toEqual('test')
  expect(body.total).toEqual('test')
  expect(body.payed).toEqual('test')
})

test('GET /orders 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /orders 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /orders 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /orders/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${order.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
})

test('GET /orders/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${order.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /orders/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('GET /orders/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /orders/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ access_token: adminSession, orderId: 'test', user: 'test', products: 'test', vat: 'test', shipping: 'test', total: 'test', payed: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(body.orderId).toEqual('test')
  expect(body.user).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.vat).toEqual('test')
  expect(body.shipping).toEqual('test')
  expect(body.total).toEqual('test')
  expect(body.payed).toEqual('test')
})

test('PUT /orders/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /orders/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('PUT /orders/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, orderId: 'test', user: 'test', products: 'test', vat: 'test', shipping: 'test', total: 'test', payed: 'test' })
  expect(status).toBe(404)
})

test('DELETE /orders/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /orders/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /orders/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('DELETE /orders/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
