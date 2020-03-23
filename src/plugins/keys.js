'use strict'

const { flags } = require('@oclif/command')

module.exports = {
  id: 'keys',
  convertToKeys: keys => keys,
  default: {},
  cmds: {
    'set-key': {
      args: [
        {
          name: 'key', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Key whoose value to change' // help description
        },
        {
          name: 'value', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Value to be set (use --json to set a JSON value)' // help description
        }
      ],
      description: 'Set a key',
      flags: {
        json: flags.boolean({
          char: 'j',
          default: false
        })
      },
      run: (flags, args, db) => {
        // args --json

        const { key: k, value: v } = args
        if (flags.json) {
          return db.set(k, JSON.parse(v))
        }

        return db.set(k, v)
      }
    },
    'del-key': {
      args: [
        {
          name: 'key', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Key whoose value to recursivly delete (be careful!)' // help description
        }
      ],
      description: 'Delete a key',
      run: (flags, args, db) => {
        return db.del(args.key)
      }
    },
    'get-key': {
      args: [
        {
          name: 'key', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Key whoose value to display' // help description
        }
      ],
      description: 'Get the value of a key',
      run: (flags, args, db) => {
        console.log(require('util').inspect(db.get(args.key), { colors: true, depth: null })) // eslint-disable-line no-console
      }
    }
  }
}
