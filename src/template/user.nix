{ config, lib, pkgs, ... }:

# This is the file that you manage
# Have fun!

with lib;

{
  environment.systemPackages = with pkgs; [
    # inxi
    # find out what it does when you uncomment it ^^
  ];
}
