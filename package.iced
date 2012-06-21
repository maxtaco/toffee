fs = require 'fs'

obj = 
  name:         "cojo"
  description:  """an express 3.x templating language based on coffeescript with slicker tokens."""
  version:      "0.0.0"
  directories:  {"lib" : "./lib"}
  main:         "index.js"
  author:       "Chris Coyne <ccoyne77@gmail.com>"
  repository:
    type: "git"
    url:  "http://github.com/malgorithms/node-cojo"
  devDependencies:
    "iced-coffee-script" : "1.3.1a"
    "jison"              : "0.3.6"
  licenses: [
    {
      type: "MIT"
      url:  "http://github.com/malgorithms/node-cojo/raw/master/LICENSE"
    }
  ]

await fs.writeFile './package.json', JSON.stringify(obj, null, " "), defer err, res