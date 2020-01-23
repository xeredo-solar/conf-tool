'use strict'

const { Command }, Config = require('@oclif/config')

const path = require('path')
const Main = require('../main')
const util = require('../main/util')

function init ({ config }) {
  // These are command constructors. They must have an `id` property as well.
  const _plugins = require('../plugins')
  const commands = []

  _plugins.forEach(pl => {
    for (const cmdId in pl.cmds) { // eslint-disable-line guard-for-in
      const cmd = pl.cmds[cmdId]

      class GeneratedCommand extends Command {
        async run () {
          const { flags } = this.parse(GeneratedCommand)
          const confDir = '/etc/nixos'
          const outDir = path.join(confDir, 'conf-tool')

          this.log(`Loading ${confDir}...`)

          const plugins = await Main(confDir, _plugins)

          if (flags.hwScan) {
            this.log('Running hw-scan...')
            await util.generateConfig(flags.root)
          }

          this.log('Writing config...')

          const files = await util.renderToFiles(plugins)
          await util.batchWriteFiles(outDir, files)

          if (flags.apply) {
            this.log('Applying config...')
            await util.applyConfig(flags.upgrade)
          }
        }
      }

      GeneratedCommand.description = `(${pl.id} ${cmdId})`
      GeneratedCommand.id = cmdId

      Object.keys(cmd).filter(k => k !== 'run').forEach(k => {
        GeneratedCommand[k] = cmd[k]
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

      // commands.push(GeneratedCommand)
    }
  })

  class DynamicPlugin extends Config.Plugin {
  }

  Object.assign(DynamicPlugin, {
    name: 'Dynamic commands "plugin"',
    hooks: {}, // Not optional
    topics: [], // Not optional
    // commands: commands.map(cmd => {
    //   const _cmd = {
    //     id: cmd.id,
    //     load: () => cmd
    //   }
    //
    //   return _cmd
    // })
    commands: commands.map(cmd => ({
      ...Command.toCached(cmd),
      load: () => cmd
    }))
  })

  config.plugins.push(new DynamicPlugin(config))
}

module.exports = init
