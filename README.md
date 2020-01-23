# conf-tool

Tool to manage the nixOS config

# Example content of /etc/nixos/conf-tool.json

```js
{
  "keys": { // will be added as-is (plugin: keys)
    "i18n": {
      ...
    }
  },
  "users": [ // for plugin users
    "username",
    "other-username"
  ],
  "software": [ // for plugin software
    "nixpkgs.pkgName" // will be validated if exists
  ],
  "softwareAllowUnfree": false // for plugin software allow-unfree (sets the config flag for nixos to allow unfree software)
}
