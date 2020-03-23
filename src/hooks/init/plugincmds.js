'use strict'

const { Command, flags } = require('@oclif/command')
const Config = require('@oclif/config')

/* eslint-disable no-loop-func */

const path = require('path')
const Main = require('../../main')
const util = require('../../main/util')

module.exports = function () {
  const _plugins = require('../../plugins')

  const commands = []
  const commandIDs = []

  _plugins.forEach(pl => {
    for (const cmdId in pl.cmds) { // eslint-disable-line guard-for-in
      const cmd = pl.cmds[cmdId]

      class GeneratedCommand extends Command {
        async run () {
          const { flags, args } = this.parse(GeneratedCommand)
          const confDir = path.join(flags.root, 'etc/nixos')
          const outDir = path.join(confDir, 'conf-tool')

          // this.log(`Loading ${confDir}...`)

          const plugins = await Main(confDir, _plugins)

          // this.log('Running command...')

          await cmd.run(flags, args, pl.db)

          // this.log('Writing config...')

          const files = await util.renderToFiles(plugins)
          await util.batchWriteFiles(outDir, files)
        }
      }

      GeneratedCommand.description = `(${pl.id} ${cmdId})`
      GeneratedCommand.id = cmdId
      GeneratedCommand.load = () => GeneratedCommand

      Object.keys(cmd).filter(k => k !== 'run').forEach(k => {
        GeneratedCommand[k] = cmd[k]
      })

      if (!GeneratedCommand.flags) {
        GeneratedCommand.flags = {}
      }

      GeneratedCommand.flags.root =
        flags.string({
          char: 'r',
          description: 'Filesystem-root to use',
          default: '/'
        })

      /* UpdateCommand.flags = {
        hwScan: flags.boolean({
          char: 'h',
          description: 'Do a hardware-scan with nixos-generate-config afterwards',
          default: true
        }),
        apply: flags.boolean({
          char: 'a',
          description: 'Apply config with nixos-rebuild switch',
          default: false
        }),
        upgrade: flags.boolean({
          char: 'u',
          description: 'nixos-rebuild switch --upgrade flag',
          default: false
        })
      } */

      commands.push(GeneratedCommand)
      commandIDs.push(cmdId)
    }
  })

  class DynamicPlugin extends Config.Plugin {
    get hooks () { return {} }
    get topics () {
      return []
    }

    get commandIDs () {
      return commandIDs
    }

    get commands () {
      return commands
    }
  }

  this.config.plugins.push(new DynamicPlugin(this.config))
}
