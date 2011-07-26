var config_loader = {};

config_loader.load = function(file) {
  try {
    var data = JSON.parse(require("fs").readFileSync(file));
  } catch (err) {
    return null;
  }

  this.resolve(data, require("path").dirname(file));

  return data;
}

config_loader.resolve = function(node, path) {
  for (var k in node) {
    if (typeof node[k] == "string" && node[k].length > 0 && node[k].substr(0, 1) == "@") {
      node[k] = this.load(require("path").join(path, node[k].substr(1)));
    } else if (typeof node[k] == "object") {
      this.resolve(node[k], path);
    }
  }
}

exports.loader = config_loader;
