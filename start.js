// NOTE: This file is not in use. Babel 7 doesn't requires start.js solution

// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
    presets: ["@babel/preset-env"]
  });
  
// Import the rest of our application.
module.exports = require('./src/index.js')

// then add 
// "start": "nodemon start.js",
// However this seems to be a outdated solution and babel 7+ is already configured in package.json