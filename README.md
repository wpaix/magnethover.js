# 🧲 MagnetHover.js
- JS Magnet hover effect for dom elements

## 📦 Dependencies
- Anime.js (window.anime) or modify the class to import it
- No jQuery

## 🧑🏼‍💻 Usage
let magnet = new MagnetHover({ document.querySelector('#myElement') })
- Param: hoverScale defaults to 1.15
- Param: pull defaults to .4
- Method: magnet.unlisten() to turn off, and magnet.listen() to turn on again
- Destroy: To destroy, use above unlisten method, or and maybe the var and dom element, as that will have listeners garbage colledted away nicely
