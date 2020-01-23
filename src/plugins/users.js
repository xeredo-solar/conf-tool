'use strict'

module.exports = {
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

  }
}
