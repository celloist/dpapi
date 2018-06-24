import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Tag, { schema } from './model'

const router = new Router()
const { name, description, categories } = schema.tree

/**
 * @api {post} /tags Create tag
 * @apiName CreateTag
 * @apiGroup Tag
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Tag's name.
 * @apiParam description Tag's description.
 * @apiParam category Tag's category.
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, categories }),
  create)

/**
 * @api {get} /tags Retrieve tags
 * @apiName RetrieveTags
 * @apiGroup Tag
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tags.
 * @apiSuccess {Object[]} rows List of tags.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tags/:id Retrieve tag
 * @apiName RetrieveTag
 * @apiGroup Tag
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /tags/:id Update tag
 * @apiName UpdateTag
 * @apiGroup Tag
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Tag's name.
 * @apiParam description Tag's description.
 * @apiParam category Tag's category.
 * @apiSuccess {Object} tag Tag's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tag not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, categories }),
  update)

/**
 * @api {delete} /tags/:id Delete tag
 * @apiName DeleteTag
 * @apiGroup Tag
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tag not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
