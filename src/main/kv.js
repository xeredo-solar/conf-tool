'use strict'

const fs = require('fs')
const debug = require('debug')
const log = debug('conf:kv')
// const fsp = fs.promises

const b = f => f + '~'

const tryLoad = file => {
  const bFile = b(file)
  let failedToLoad = false

  log('load %s', file)

  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file))
    } catch (error) {
      console.error('Failed loading DB: %s', error) // eslint-disable-line no-console
      log(error)
      failedToLoad = error
    }
  }

  if (fs.existsSync(bFile)) {
    console.error('Trying backup %s...', bFile) // eslint-disable-line no-console
    try {
      return JSON.parse(fs.readFileSync(bFile))
    } catch (error) {
      console.error('Failed loading backup DB: %s', error) // eslint-disable-line no-console
      log(error)
      failedToLoad = error
    }
  }

  if (!failedToLoad) {
    return {}
  }

  console.error('DB failed to load, is corrupt') // eslint-disable-line no-console
  throw failedToLoad
}

const trySave = (file, data) => {
  const bFile = b(file)

  log('save %s', file)

  try {
    fs.writeFileSync(bFile, JSON.stringify(data))
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
    fs.renameSync(bFile, file)
  } catch (error) {
    console.error('DB failed to save: %s', error) // eslint-disable-line no-console
    console.error('Are you on the right user?') // eslint-disable-line no-console
    throw error
  }
}

// TODO: async?

const dget = require('dlv')
const dset = require('dset')

module.exports = file => {
  const db = tryLoad(file)

  return {
    set: (k, v) => {
      dset(db, k, v)
      trySave(file, db)
    },
    get: k => {
      return dget(db, k)
    }
  }
}
