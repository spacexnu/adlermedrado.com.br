---
title: "Sudo with Touch ID on macOS"
date: 2024-06-05T20:03:28-03:00
draft: false
tags:
  - "tip"
  - "mac"
---

Setting up sudo for use with Touch ID on macOS Sonoma in just a few steps is very easy.

Locate the _file /etc/pam.d/sudo_local.template_ and make a copy as shown in the example below:

```bash
sudo cp /etc/pam.d/sudo_local.template /etc/pam.d/sudo_local
```

Then edit the file and remove the # character from the beginning of line 3, it should look like this:

```text
# sudo_local: local config file which survives system update and is included for sudo
# uncomment following line to enable Touch ID for sudo
auth sufficient pam_tid.so
```

As I use sudo a lot, this configuration is very convenient for me.

I hope that this tip will be of some use to you.
