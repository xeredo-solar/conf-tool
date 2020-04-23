'use strict'

const { checkIfPackageExists } = require('../main/util')

module.exports = {
  id: 'software',
  convertToKeys: pkgs => ({
    environment: {
      systemPackages: pkgs.map(pkg => ({ _literal: true, _value: pkg }))
    }
  }),
  default: [],
  cmds: {
    install: {
      args: [
        {
          name: 'attr', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Package (as attribute) to install. Ex: nixpkgs.nano' // help description
        }
      ],
      description: 'Install a package',
      flags: {},
      run: async (flags, args, db) => {
        const { attr } = args
        const pkgs = db.get()

        const exists = await checkIfPackageExists(attr)

        if (!exists) {
          throw new Error('Package does not exist. Try updating channels...')
        }

        if (pkgs.indexOf(attr) !== -1) {
          console.log('Already installed, ignoring...') // eslint-disable-line no-console
          return
        }

        pkgs.push(attr)

        db.set()
      }
    },
    uninstall: {
      args: [
        {
          name: 'attr', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Package (as attribute) to uninstall. Ex: nixpkgs.nano' // help description
        }
      ],
      description: 'Uninstall a package',
      run: (flags, args, db) => {
        const { attr } = args
        let pkgs = db.get()

        if (pkgs.indexOf(attr) === -1) {
          console.log('Not installed, ignoring...') // eslint-disable-line no-console
          return
        }

        pkgs = pkgs.filter(pkg => pkg !== attr)

        db.set(null, pkgs)
      }
    }
  }
}
