'use strict'

const Keyv = require('keyv')
const KeyvFile = require('keyv-file')

const DB = require('./db')

/* eslint-disable no-await-in-loop */

// const os = require('os')
const path = require('path')
const fs = require('fs')

const mkdirp = require('mkdirp').sync

module.exports = async (confDir = '/etc/nixos', _plugins) => {
  if (!fs.existsSync(confDir)) {
    mkdirp(confDir)
  }

  const plugins = _plugins || require('../plugins')

  const mainDb = new Keyv({
    store: new KeyvFile({
      filename: path.join(confDir, 'conf-tool.json'), // the file path to store the data
      expiredCheckDelay: 24 * 3600 * 1000, // ms, check and remove expired data in each ms
      writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
      encode: JSON.stringify, // serialize function
      decode: JSON.parse // deserialize function
    })
  })

  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i]
    plugin.db = await DB(mainDb, plugin.id, plugin.default)
  }

  return plugins
}
