import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Invoice } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, invoice

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  invoice = await Invoice.create({ userInfo: user })
})

test('POST /invoices 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, invoiceId: 'test', orderId: 'test', products: 'test', vat: 'test', shippingPrice: 'test', totals: 'test', paymentInfo: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.invoiceId).toEqual('test')
  expect(body.orderId).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.vat).toEqual('test')
  expect(body.shippingPrice).toEqual('test')
  expect(body.totals).toEqual('test')
  expect(body.paymentInfo).toEqual('test')
  expect(typeof body.userInfo).toEqual('object')
})

test('POST /invoices 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /invoices 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].userInfo).toEqual('object')
})

test('GET /invoices 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /invoices/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
  expect(typeof body.userInfo).toEqual('object')
})

test('GET /invoices/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('GET /invoices/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /invoices/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ access_token: adminSession, invoiceId: 'test', orderId: 'test', products: 'test', vat: 'test', shippingPrice: 'test', totals: 'test', paymentInfo: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
  expect(body.invoiceId).toEqual('test')
  expect(body.orderId).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.vat).toEqual('test')
  expect(body.shippingPrice).toEqual('test')
  expect(body.totals).toEqual('test')
  expect(body.paymentInfo).toEqual('test')
})

test('PUT /invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /invoices/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('PUT /invoices/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, invoiceId: 'test', orderId: 'test', products: 'test', vat: 'test', shippingPrice: 'test', totals: 'test', paymentInfo: 'test' })
  expect(status).toBe(404)
})

test('DELETE /invoices/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /invoices/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('DELETE /invoices/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
