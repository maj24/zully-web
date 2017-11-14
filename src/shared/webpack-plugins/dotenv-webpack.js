const dotenv = require('dotenv');
const fs = require('fs');
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = DotenvPlugin;

function DotenvPlugin(options) {
  options = options || {};
  if (!options.path) {options.path = './.env';}

  dotenv.config(options);
  this.env = dotenv.parse(fs.readFileSync(options.path));
}

DotenvPlugin.prototype.apply = function(compiler) {
  const definitions = Object.keys(this.env).reduce((definitions, key) => {
    const existing = process.env[key];

    if (existing) {
      definitions[key] = JSON.stringify(existing);
      return definitions;
    }

    const value = this.env[key];
    definitions[key] = JSON.stringify(value);

    return definitions;
  }, {});

  const plugin = {
    'process.env': definitions,
  };

  compiler.apply(new DefinePlugin(plugin));
};
