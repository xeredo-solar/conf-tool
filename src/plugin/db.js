'use strict'

const dget = require('dlv')
const dset = require('dset')

module.exports = async (mainDb, name, def) => {
  let db = await mainDb.get(name)

  if (db === null || db === undefined) {
    db = def
  }

  return {
    get: (k, d) => {
      if (!k) return db
      return dget(db, k, d)
    },
    set: (k, v) => {
      if (k) {
        dset(db, k, v)
      }

      return mainDb.set(name, db)
    },
    del: k => {
      if (k) {
        dset(db, k, null)
      } else {
        db = def
      }

      return mainDb.set(name, db)
    }
  }
}
