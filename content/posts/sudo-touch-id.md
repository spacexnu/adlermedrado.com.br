---
title: "Sudo with Touch ID on macOS"
date: 2024-06-05T20:03:28-03:00
draft: false
tags:
  - "tip"
  - "mac"
  - "security"
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

### Detailed Steps to Edit the File
To edit the file, use a text editor like nano or vim. For example, with nano:
```bash
sudo nano /etc/pam.d/sudo_local
```
Make the necessary changes and save the file (Ctrl+O, Enter, Ctrl+X in nano).

### Benefits of Using Touch ID with sudo
* Convenience: Touch ID eliminates the need to repeatedly type your password, making the process faster and easier.
* Security: Touch ID adds an extra layer of security, ensuring only authorized users can execute sudo commands.

### Troubleshooting Common Issues

**Touch ID Not Working:**

* Check if the /etc/pam.d/sudo_local file is configured correctly.
* Ensure your macOS is updated and Touch ID is set up in system preferences.

### macOS Versions
This configuration has been tested on macOS Sonoma but may work on other recent macOS versions. Check your system documentation for confirmation.

### Security Considerations
Using Touch ID for sudo is generally safe and convenient. However, ensure your Touch ID is correctly configured and that only authorized users have access to your Mac.

As I use sudo a lot, this configuration is very convenient for me.

I hope that this tip will be of some use to you.

_Updated: June 16, 2024_