---
title: "Install lxml on MacBook with Apple Silicon"
date: "2023-01-03"
tags: 
  - "mac"
  - "python"
  - "tip"
---

![pip install error when installing lxml](/posts/images/Screenshot-2023-01-03-at-14.57.09-1024x515.png)

Today I needed to install lxml into a python project I'm working on my local machine, but I got the following errors when xmlsec, that is a library dependency, was being installed:

```bash
Building wheels for collected packages: xmlsec  
Building wheel for xmlsec (pyproject.toml) … error  
error: subprocess-exited-with-error  
× Building wheel for xmlsec (pyproject.toml) did not run successfully.  
│ exit code: 1  
╰─> [13 lines of output]  
running bdist_wheel  
running build  
running build_py  
creating build  
creating build/lib.macosx-13.0-arm64-cpython-310  
creating build/lib.macosx-13.0-arm64-cpython-310/xmlsec  
copying src/xmlsec/py.typed -> build/lib.macosx-13.0-arm64-cpython-310/xmlsec  
copying src/xmlsec/tree.pyi -> build/lib.macosx-13.0-arm64-cpython-310/xmlsec  
copying src/xmlsec/**init**.pyi -> build/lib.macosx-13.0-arm64-cpython-310/xmlsec  
copying src/xmlsec/constants.pyi -> build/lib.macosx-13.0-arm64-cpython-310/xmlsec  
copying src/xmlsec/template.pyi -> build/lib.macosx-13.0-arm64-cpython-310/xmlsec  
running build_ext  
error: xmlsec1 is not installed or not in path.  
[end of output]  
note: This error originates from a subprocess, and is likely not a problem with pip.  
ERROR: Failed building wheel for xmlsec  
Failed to build xmlsec  
ERROR: Could not build wheels for xmlsec, which is required to install pyproject.toml-based projects
```
So to install it, on my MacBook machine with Apple Silicon and macOS Ventura, I needed to execute the following commands:

Install some dependencies on OS level:
```bash
brew install libxml2 libxmlsec1 pkg-config
```
Set the dependencies' path: 
```bash
export LDFLAGS="-L/opt/homebrew/opt/libxml2/lib"  
export CPPFLAGS="-I/opt/homebrew/opt/libxml2/include"
```
Run the pip command again:

```bash
pip install lxml
```
That's it.
