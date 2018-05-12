'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function (db, callback) {
  db.createTable('listings', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    title: 'string',  // shorthand notation
    description: 'string',  // shorthand notation
    img: 'string'  // shorthand notation
  }, callback)
}

exports.down = function (db) {
  return null
}

exports._meta = {
  'version': 1
}
