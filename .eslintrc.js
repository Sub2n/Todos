module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "jquery": true
  },
  "extends": "airbnb-base",
  "plugins": [ "import", "html" ],
  "rules": {
      // 0 "off", 1 "warn" 2 "error"
      "no-console": 0,
      "quotes": [ "error", "single" ],
      "no-underscore-dangle": "warn",
      "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true }],
      "comma-dangle": [ "error", "never"],
      "no-var" : 0,
      "vars-on-top" : 0
  }
};