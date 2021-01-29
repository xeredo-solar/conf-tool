{
  description = "Tool to manage the nixOS config";

  inputs.solar.url = "github:ssd-solar/solaros-nix/flake";

  outputs = { self, nixpkgs, solar }: {
    defaultPackage = solar.lib.forAllSystems({ pkgs, ... }: pkgs.callPackage ./package.nix { });
  };
}
