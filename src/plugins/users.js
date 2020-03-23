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
      description: 'Add a user',
      run: async (flags, { username }, db) => {
        const v = await db.get()

        if (v.indexOf(username) !== -1) {
          console.error('User already exists, ignoring...') // eslint-disable-line no-console
          return
        }

        v.push(username)

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
      description: 'Delete a user',
      run: async (flags, { username }, db) => {
        let v = await db.get()

        if (v.indexOf(username) === -1) {
          console.error('User does not exist, ignoring...') // eslint-disable-line no-console
          return
        }

        v = v.filter(name => name !== username)

        await db.set(null, v)
      }
    },
    'list-users': {
      description: 'List all users',
      run: async (flags, args, db) => {
        const users = await db.get()
        const out = users.length ? users.join('\n') : '<no users>'
        console.log(out) // eslint-disable-line no-console
      }
    }
  }
}
