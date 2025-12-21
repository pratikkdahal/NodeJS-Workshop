

* package.json ma gayera script ma gayera afno personnal command haru banaunu milcha 
 
 > "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "node --watch app.js"
  },

* and run it ny using npm before start in cmd

* if start/ test cha vane npm start/ test garnu milyo
* else aru word jastai pratik k k halnu cha vane npm run pratik garnu paryo

# .env file
 * private kura haru publicly access nagarna .env file ma rakhcham
 * .env package install garnu parcha
 * app.js ma require garnu paryo with .config()
 >require("dotenv").config()