import { success, notFound } from '../../services/response/'
import { Enums } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Enums.create(body)
    .then((enums) => enums.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Enums.find(query, select, cursor)
    .then((enums) => enums.map((enums) => enums.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Enums.findById(params.id)
    .then(notFound(res))
    .then((enums) => enums ? enums.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Enums.findById(params.id)
    .then(notFound(res))
    .then((enums) => enums ? Object.assign(enums, body).save() : null)
    .then((enums) => enums ? enums.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Enums.findById(params.id)
    .then(notFound(res))
    .then((enums) => enums ? enums.remove() : null)
    .then(success(res, 204))
    .catch(next)
