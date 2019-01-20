# Adauru CLI

<p align="center">
  <img src="https://777999.au.ru/zmnv/adauru-cli/howitworks_scheme.png" width="584">
</p>

```
npm install -g adauru-cli
```

```
adauru-cli run
```

It helps when you need to:
* merge assets in one html file.
* merge Google Web Designer build files in one.
* other...

## How it works?


You need to open folder with structure:
```
FolderName
- index.html (by default)
- image.png (can use: jpg, jpeg, png, gif, svg)
```

Run command inside *FolderName* folder:
```
adauru-cli run
```

1. Adauru scans current folder to find:  
a) images  
b) html file (*index.html by default*).
2. All found images are converted to base64 string.
3. Replace all `src="image.png"` to `src="data:image/png;base64,h4sh1mg…"` in html file.

After it creates build with single html file:
```
FolderName
- build
-- FolderName.html <- that file
- index.html (by default)
- image.png (can use: jpg, jpeg, png, gif, svg)
```

<p align="center">
  <img src="https://777999.au.ru/zmnv/adauru-cli/howitworks_console.png" width="368">
</p>

## Help

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

## Updates 
Roadmap:
* ~~Auto update check~~
* More output analytics
* Define input html file by command ```adauru-cli run name.html```
* Image compression like TinyPNG.com
* Support scan inside .js files (ex. Adobe Animate CC builds)

Coming soon!

