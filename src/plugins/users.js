'use strict'

module.exports = {
  id: 'users',
  convertToKeys: users => {
    const base = {
      users: {
        users: {}
      }
    }

    users.forEach(user => {
      base.users.users[user] = {
        createHome: true,
        isNormalUser: true,
        extraGroups: ['wheel', 'networkmanager', 'audio', 'video']
      }
    })

    return base
  },
  default: [],
  cmds: {
    'add-user': {
      args: [
        {
          name: 'username', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Username to add' // help description
        }
      ],
      run: async (flags, args, db) => {
        const v = await db.get()

        if (v.indexOf(args[0]) !== -1) {
          throw new Error('User already exists')
        }

        v.push(args[0])

        await db.set()
      }
    },
    'del-user': {
      args: [
        {
          name: 'username', // name of arg to show in help and reference with args[name]
          required: true, // make the arg required with `required: true`
          description: 'Username to remove' // help description
        }
      ],
      run: async (flags, args, db) => {
        let v = await db.get()

        if (v.indexOf(args[0]) === -1) {
          throw new Error('User does not exist')
        }

        v = v.filter(name => name !== args[0])

        await db.set(null, v)
      }
    },
    'list-users': {
      run: async (flags, args, db) => {
        console.log(require('util').inspect(await db.get(), { colors: true, depth: null })) // eslint-disable-line no-console
      }
    }
  }
}
