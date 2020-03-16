# conf-tool

Tool to manage the nixOS config

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g conf-tool
$ conf COMMAND
running command...
$ conf (-v|--version|version)
conf-tool/0.0.1 linux-x64 node-v10.18.1
$ conf --help [COMMAND]
USAGE
  $ conf COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`conf hello`](#conf-hello)
* [`conf help [COMMAND]`](#conf-help-command)

## `conf hello`

Describe the command here

```
USAGE
  $ conf hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/mercode-org/conf-tool/blob/v0.0.1/src/commands/hello.js)_

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
