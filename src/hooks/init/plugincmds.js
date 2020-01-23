'use strict'

const { Command } = require('@oclif/command')
const Config = require('@oclif/config')
const ux = require('cli-ux')

module.exports = async function () {
  class DynamicPlugin extends Config.Plugin {
    get hooks () { return {} }
    get topics () {
      return []
    }

    get commandIDs () {
      return ['mydynamiccommand']
    }

    get commands () {
      var _a
      const cmd = (_a = class extends Command {
        static load () { return cmd }
        async run () {
          ux.log('running mydynamiccommand')
        }
      },
      _a.id = 'mydynamiccommand',
      _a)
      return [cmd]
    }
  }

  this.config.plugins.push(new DynamicPlugin(this.config))
}
