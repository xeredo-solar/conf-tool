'use strict'

const { Command, flags } = require('@oclif/command')

const path = require('path')
const Main = require('../main')
const util = require('../main/util')
const fs = require('fs')
const stream = require('stream')
const _util = require('util')
const mkdirp = require('mkdirp').sync

const finished = _util.promisify(stream.finished)

class InitCommand extends Command {
  async run () {
    const { flags } = this.parse(InitCommand)
    const confDir = path.join(flags.root, 'etc/nixos')
    const outDir = path.join(confDir, 'conf-tool')

    this.log(`Loading ${confDir}...`)

    if (flags.seed) {
      const conf = path.join(confDir, 'conf-tool', 'conf-tool.json')
      mkdirp(outDir)

      const stream = fs.createReadStream(flags.seed)
        .pipe(fs.createWriteStream(conf))
      this.log(`Creating seeded config ${conf}...`)

      await finished(stream)
    }

    const plugins = await Main(confDir)

    const templateSrc = path.join(__dirname, '..', 'template', flags.template)

    const templateFiles = fs.readdirSync(templateSrc)

    for (let i = 0; i < templateFiles.length; i++) {
      const file = templateFiles[i]

      this.log(`Creating/overwriting ${path.join(confDir, file)}`)

      fs.createReadStream(path.join(templateSrc, file))
        .pipe(fs.createWriteStream(path.join(confDir, file)))
    }

    if (flags.hwScan) {
      this.log('Running hw-scan...')
      await util.generateConfig(flags.root)
    }

    this.log('Writing config...')

    const files = await util.renderToFiles(plugins)
    await util.batchWriteFiles(outDir, files)
  }
}

InitCommand.description = `Initializes a new conf-tool configuration
...
test
`

InitCommand.flags = {
  root: flags.string({
    char: 'r',
    description: 'Filesystem-root to use',
    default: '/'
  }),
  template: flags.string({
    char: 't',
    description: 'Template to copy (meros, nixos)',
    default: 'meros'
  }),
  hwScan: flags.boolean({
    char: 'h',
    description: 'Do a hardware-scan with nixos-generate-config afterwards',
    default: true
  }),
  init: flags.boolean({
    char: 'i',
    description: 'Install the OS with nixos-install (requires -h, also todo)',
    default: false
  }),
  seed: flags.string({
    char: 's',
    description: 'Seed config to copy',
    default: null
  })
}

module.exports = InitCommand
