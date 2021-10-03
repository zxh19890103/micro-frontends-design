## High view

### Three levels

1. vendors to be fixed
  - react
  - react-dom
  - &etc.
2. companies' packages
  - components
  - pages
  - global i18n
  - global redux
  - &etc.
3. your app.

### Relations of these three

- 2 uses 1 as dll-reference.
- 3 uses 2 & 1 as dll-reference.

## Future things you should do

- private packages' publish
- declaration files you should write for private packages
- deploy vendors and public libraries on an standalone endpoint
- downloads manifest app needs
- judges if we should put all components in src or the project root.
  - entryOnly ?
  - or npm pre-publish build for every package