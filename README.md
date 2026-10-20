# Mythras Tools

A character workshop and table companion for Mythras: character creation, responsive sheets, PDF printing, a character library, combat flow and reference browsers. The parchment and purple theme is retained, and existing character JSON saves remain supported.

## Run locally

```sh
npm install
npm start
```

Open `http://localhost:4200/`. Characters autosave in this browser. Use the library's **Back up library** or an individual **Download JSON** action to keep an external copy.

The responsive sheet opens on **Play**, with manual current HP/points, fatigue and session notes. **Sections** stays within reach while scrolling; **Skills** and **Magic** have search, and weapon cards expose their values and rule links without sideways scrolling. **Sheet tools** contains editing, printing and JSON backup. Saves are local to each browser/device; transfer a downloaded JSON through the character library when switching devices.

## Install on a phone or tablet

On the published HTTPS site, choose **Install app** from the main menu. Supporting browsers offer an install button; otherwise use the browser's **Install app / Add to Home screen** action. On iPhone/iPad, open Safari's Share menu and choose **Add to Home Screen** (keep **Open as Web App** enabled when offered).

Android/Chrome normally retains the same browser's saved characters. An iPhone/iPad home-screen app has separate storage: use **Back up before installing**, then **Import JSON** inside the installed app. Backups also include draft-only legacy characters. Installing does not synchronize devices or browsers.

Wait for **Ready offline** before relying on offline access. The installed app caches character creation, sheets, PDF assets and references, including fonts/icons. Available updates can be applied from **Reload to update** in the main menu; updates do not erase character saves. Keep JSON backups for browser-data clearing or device changes.

## Build for GitHub Pages

```sh
npm run build:pages
```

This single command works in Windows PowerShell/Command Prompt, macOS and Linux, without Bash. It builds into `docs/` using relative asset paths, creates `404.html`, and prepares offline support. Then commit and push, including `docs/`. The default works under `/mythras-tools/` as well as a custom domain. An explicit base path is also supported: `npm run build:pages -- /mythras-tools/`. Hash routing is retained.

`bash build.sh` remains available and runs the same build.

For this repository, the published app is `https://tsinwntas.github.io/mythras-tools/`; links such as `#/menu` and `#/combat` remain unchanged. The manifest and service worker stay scoped to `/mythras-tools/`, leaving the parent GitHub Pages site and sibling repositories outside the app's control.

The build also generates `sw.js` with a versioned offline asset list. `npm run build` performs the same preparation through its `postbuild` script. If invoking `ng build` directly, run `node scripts/prepare-pwa.cjs <output-folder>` afterwards to enable offline installation support.

`npm run build` produces a normal production build in `dist/mythras-tools/`.

## Check save compatibility

```sh
npm run test:compat
```

This runs the focused compatibility and save-safety tests with ChromeHeadless. Set `CHROME_BIN` if Chrome is not discovered. `npm test` runs the project's full existing test setup.

See [PROJECT-NOTES.md](PROJECT-NOTES.md) for the save schema, recovery behavior, reference-data map, creation-rule decisions, customization structures, PDF sizing and validation details.
