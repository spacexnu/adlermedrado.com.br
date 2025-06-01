---
title: "Install & Neovim Bootstrap Revamp"
date: 2025-05-31T22:29:46-03:00
draft: false
tags: [dotfiles]
---

Ongoing work on fully revamping my dot-files `install.sh` and Neovim stack.

- Dotfiles bootstrap is now modular and declarative.
- `install.sh` handles symlinks, backups, plugin sync, and full lazy.nvim bootstrap automatically.
- Neovim config is framework-free, built from scratch with isolated plugin control.
- Full lazy-loading using `lazy.nvim`, with sniper-level loading precision.
- LSP, CMP, Treesitter, and nvim-tree properly initialized using `config` blocks.
- Keymaps handled via `which-key` with full namespace documentation.

Work in progress. Updates and refinements will continue over the next days.

Source: [spacexnu/dot-files](https://github.com/spacexnu/dot-files)