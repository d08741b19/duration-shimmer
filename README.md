A Firefox Extension compatibility shim that provides the missing `Intl.DurationFormat` API for Firefox ESR 115.

This resolves Tuta (Tutanota) webmail loading on Firefox ESR versions that do not support `Intl.DurationFormat` (https://github.com/tutao/tutanota/issues/11444).

### Installation
1. Download the files in the `duration-shimmer` folder.
4. Package the files as an `.xpi` file (`.zip` with *deflate* compression or *store* mode, renamed to `.xpi`).
5. Set `xpinstall.signatures.required` to `false` in `about:config`. <sup>`READ WARNING!`</sup>
6. Install your `.xpi` file from `about:addons`. <sup>[`instructions`](https://extensionworkshop.com/documentation/publish/install-self-distributed/#install-addon-from-file)</sup>

### Warning
>**Disabling extension signature checks can be dangerous. It will allow you to install unsigned extensions from untrusted sources without warning you about it. Only change this setting if you understand the implications.**

### Limitations
This is a compatibility shim, not a complete implementation of the ECMAScript Internationalization API proposal.
It does not attempt to reproduce every advanced formatting option of the native implementation.
