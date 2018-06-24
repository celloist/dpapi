import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Seller, { schema } from './model'

const router = new Router()
const { email, name, address, communication, platform, storeId, categories } = schema.tree

/**
 * @api {post} /sellers Create seller
 * @apiName CreateSeller
 * @apiGroup Seller
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam email Seller's email.
 * @apiParam name Seller's name.
 * @apiParam address Seller's address.
 * @apiParam name Seller's name.
 * @apiParam storeId Seller's storeId.
 * @apiParam categories Seller's categories.
 * @apiParam communcation Seller's communcation.
 * @apiSuccess {Object} seller Seller's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Seller not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ email, name, address:[Object], platform, storeId, categories, communication: [Object] }),
  create)

/**
 * @api {get} /sellers Retrieve sellers
 * @apiName RetrieveSellers
 * @apiGroup Seller
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} sellers List of sellers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /sellers/:id Retrieve seller
 * @apiName RetrieveSeller
 * @apiGroup Seller
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} seller Seller's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Seller not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /sellers/:id Update seller
 * @apiName UpdateSeller
 * @apiGroup Seller
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam email Seller's email.
 * @apiParam name Seller's name.
 * @apiParam address Seller's address.
 * @apiParam name Seller's name.
 * @apiParam storeId Seller's storeId.
 * @apiParam categories Seller's categories.
 * @apiParam communcation Seller's communcation.
 * @apiSuccess {Object} seller Seller's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Seller not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ email, name, address:[Object], platform, storeId, categories, communication: [Object] }),
  update)

/**
 * @api {delete} /sellers/:id Delete seller
 * @apiName DeleteSeller
 * @apiGroup Seller
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Seller not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
