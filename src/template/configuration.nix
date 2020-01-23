{ config, lib, pkgs, ... }:

# This is the nixOS configuration for your system
# It's managed with conf-tool, but you can play arround in ./user.nix
# You can also synchronise this configuration by tracking it in git, for example

# For more details about the options see: https://nixos.org/nixos/manual.html and https://nixos.org/nixos/options.html
# The conf-tool documentation can be found at https://os.mercode.org/docs/conf-tool

with lib;

{
  imports = [
    <meros/config> # managed by the merOS team, applies branding
    ./conf-tool # managed by conf-tool, contains your settings
    ./user.nix # managed by YOU alone :)
  ];
}
