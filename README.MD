# Adauru CLI

<p align="center">
  <img src="https://777999.au.ru/zmnv/adauru-cli/howitworks_scheme.png" width="584">
</p>

```js
npm install -g adauru-cli
```

```js
// open folder with index.html (by default) then run:
adauru-cli run
```

It helps when you need to:
* merge assets in one html file.
* merge Google Web Designer build files in one.
* other...

# How it works?

You need to open folder with stucture:
```js
FolderName
- index.html // (by default)
- image.png // jpg, jpeg, png, gif, svg
```

1. Adauru scans current folder to find:  
a) images  
b) html file (*index.html by default*).
2. All found images are converted to base64 string.
3. Replace all `src="image.png"` to `src="data:image/png;base64,h4sh1mg…"` in html file.

# Help

```
Usage: adauru-cli [options] [command]

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:
  version|v      Show version with logo.
  scan|s         Just scan current folder and show images list.
  duplicate|d    Just duplicate index.html to build/<FolderName>.html.
  run|r          Scan, Encode & Replace images in index.html
```

Adauru has update check when it scans folder.

## Project is alive. Updates coming soon...
