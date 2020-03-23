# conf-tool

Tool to manage the nixOS config

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [conf-tool](#conf-tool)
* [Usage](#usage)
* [Commands](#commands)
* [Example content of /etc/nixos/conf-tool.json](#example-content-of-etcnixosconf-tooljson)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g conf-tool
$ conf COMMAND
running command...
$ conf (-v|--version|version)
conf-tool/0.0.2 linux-x64 node-v12.16.1
$ conf --help [COMMAND]
USAGE
  $ conf COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`conf help [COMMAND]`](#conf-help-command)
* [`conf init`](#conf-init)
* [`conf update`](#conf-update)

## `conf help [COMMAND]`

display help for conf

```
USAGE
  $ conf help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `conf init`

Initializes a new conf-tool configuration

```
USAGE
  $ conf init

OPTIONS
  -h, --hwScan             Do a hardware-scan with nixos-generate-config afterwards
  -i, --init               Install the OS with nixos-install (requires -h, also todo)
  -r, --root=root          [default: /] Filesystem-root to use
  -s, --seed=seed          Seed config to copy
  -t, --template=template  [default: meros] Template to copy (meros, nixos)

DESCRIPTION
  ...
  test
```

_See code: [src/commands/init.js](https://github.com/mercode-org/conf-tool/blob/v0.0.2/src/commands/init.js)_

## `conf update`

Updates as conf-tool configuration

```
USAGE
  $ conf update

OPTIONS
  -a, --apply    Apply config with nixos-rebuild switch
  -h, --hwScan   Do a hardware-scan with nixos-generate-config afterwards
  -u, --upgrade  nixos-rebuild switch --upgrade flag

DESCRIPTION
  ...
  test
```

_See code: [src/commands/update.js](https://github.com/mercode-org/conf-tool/blob/v0.0.2/src/commands/update.js)_
<!-- commandsstop -->

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
