'use strict'

module.exports = {
  id: 'softwareAllowUnfree',
  convertToKeys: allowUnfree => {
    return { nixpkgs: { config: { allowUnfree } } }
  },
  default: [],
  cmds: {
    'allow-unfree': {
      description: 'Allow installing unfree software',
      run: async (flags, args, db) => {
        await db.set(true)
      }
    },
    'disallow-unfree': {
      description: 'Disallow installing unfree software',
      run: async (flags, args, db) => {
        await db.set(false)
      }
    }
  }
}
