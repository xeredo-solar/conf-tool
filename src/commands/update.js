'use strict'

const { Command, flags } = require('@oclif/command')

const path = require('path')
const Main = require('../main')
const util = require('../main/util')

class UpdateCommand extends Command {
  async run () {
    const { flags } = this.parse(UpdateCommand)
    const confDir = path.join('/etc/nixos')
    const outDir = path.join(confDir, 'conf-tool')

    this.log(`Loading ${confDir}...`)

    const plugins = await Main(confDir)

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

UpdateCommand.description = `Updates as conf-tool configuration
...
test
`

UpdateCommand.flags = {
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
}

module.exports = UpdateCommand
