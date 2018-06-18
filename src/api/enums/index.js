import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Enums, { schema } from './model'

const router = new Router()
const { name, values } = schema.tree

/**
 * @api {post} /enums Create enums
 * @apiName CreateEnums
 * @apiGroup Enums
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Enums's name.
 * @apiParam values Enums's values.
 * @apiSuccess {Object} enums Enums's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Enums not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, values }),
  create)

/**
 * @api {get} /enums Retrieve enums
 * @apiName RetrieveEnums
 * @apiGroup Enums
 * @apiUse listParams
 * @apiSuccess {Object[]} enums List of enums.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /enums/:id Retrieve enums
 * @apiName RetrieveEnums
 * @apiGroup Enums
 * @apiSuccess {Object} enums Enums's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Enums not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /enums/:id Update enums
 * @apiName UpdateEnums
 * @apiGroup Enums
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Enums's name.
 * @apiParam values Enums's values.
 * @apiSuccess {Object} enums Enums's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Enums not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, values }),
  update)

/**
 * @api {delete} /enums/:id Delete enums
 * @apiName DeleteEnums
 * @apiGroup Enums
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Enums not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
