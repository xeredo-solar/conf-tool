'use strict'

const { Command } = require('@oclif/config')

function init ({ config }) {
  // These are command constructors. They must have an `id` property as well.
  const commands = []

  config.plugins.push({
    name: 'Dynamic commands "plugin"',
    hooks: {}, // Not optional
    topics: [], // Not optional
    commands: commands.map(cmd => ({
      ...Command.toCached(cmd),
      load: () => cmd
    }))
  })
}

module.exports = init
