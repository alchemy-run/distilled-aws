# spec-mirror-google-workspace

A git mirror of Google Workspace [API Discovery](https://developers.google.com/discovery)
documents. The central directory at
`https://www.googleapis.com/discovery/v1/apis` lists every Google API; this
mirror keeps only the Workspace product names documented at
[Enable Google Workspace APIs](https://developers.google.com/workspace/guides/enable-apis)
(Admin SDK, Gmail, Calendar, Drive, Docs, Sheets, Slides, Chat, Classroom,
People, Forms, Meet, Keep, Apps Script, and the rest of that table).

All versions of those APIs are fetched and committed as JSON so the repo
serves as a versioned snapshot of the Workspace catalog.

The mirror is updated every 24 hours and is designed to be used as a stable
git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-google-workspace.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
