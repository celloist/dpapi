import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create,createMe, index, show,showMe, update, destroy } from './controller'
import { schema } from './model'
export Order, { schema } from './model'

const router = new Router()
const { vat, shipping, total, payed } = schema.tree

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder for logged in user
 * @apiGroup Order
 * @apiParam orderId Order's orderId.
 * @apiParam user Order's user.
 * @apiParam products Order's products.
 * @apiParam vat Order's vat.
 * @apiParam shipping Order's shipping.
 * @apiParam total Order's total.
 * @apiParam payed Order's payed.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post('/',
  token({ required: true }),
  body({ products: [Object], vat, shipping, total, payed }),
  createMe)

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam orderId Order's orderId.
 * @apiParam user Order's user.
 * @apiParam products Order's products.
 * @apiParam vat Order's vat.
 * @apiParam shipping Order's shipping.
 * @apiParam total Order's total.
 * @apiParam payed Order's payed.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post('/admin/:userId',
  token({ required: true, roles: ['admin'] }),
  body({ user: [Object], products: [Object], vat, shipping, total, payed }),
  create)


/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of orders.
 * @apiSuccess {Object[]} rows List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /orders/me Retrieve orders
 * @apiName RetrieveOrders for me
 * @apiGroup Order
 * @apiPermission
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of orders.
 * @apiSuccess {Object[]} rows List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/me',
  token({ required: true }),
  query(),
  showMe)

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam orderId Order's orderId.
 * @apiParam user Order's user.
 * @apiParam products Order's products.
 * @apiParam vat Order's vat.
 * @apiParam shipping Order's shipping.
 * @apiParam total Order's total.
 * @apiParam payed Order's payed.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ user: [Object], products: [Object], vat, shipping, total, payed }),
  update)

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
