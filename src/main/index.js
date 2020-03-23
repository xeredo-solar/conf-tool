'use strict'

const KV = require('./kv')

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

  const mainDb = await KV(path.join(confDir, 'conf-tool.json'))

  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i]
    plugin.db = await DB(mainDb, plugin.id, plugin.default)
  }

  return plugins
}
