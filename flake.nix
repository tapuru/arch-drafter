{
  description = "Dev shell for arch-drafter";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      name = "arch-drafter";

      buildInputs = [
        pkgs.git
        pkgs.nodejs
        pkgs.pnpm
        pkgs.docker
        pkgs.bashInteractive
        pkgs.nest-cli
      ];

      shellHook = ''
        echo "arch-drafter dev shell started"
      '';
    };
  };
}
