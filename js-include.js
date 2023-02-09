const fs = require('fs');
const path = require('path');

module.exports.__includeDir = function(dir, parent = null) {
    if(!dir.endsWith(path.sep)) dir += path.sep;
    if(!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) return;

    let files = fs.readdirSync(dir, 'utf8');
    let key = path.basename(dir);

    if(!parent) {
        module.exports[key] = {};
        parent = module.exports[key];
    }

    files.forEach(file => {
        if(fs.statSync(dir + file).isDirectory()) {
            key = path.basename(dir + file);
            if(!parent[key]) parent[key] = {};
            module.exports.__includeDir(dir + file, parent[key]);
        } else {
            module.exports.__includeFile(dir + file, parent);
        }
    });
}

module.exports.__requireDir = function(dir, parent = null) {
    if(!dir.endsWith(path.sep)) dir += path.sep;
    if(!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) throw new Error(`Directory "${dir}" does not exist.`);
    module.exports.__includeDir(dir, parent);
}

module.exports.__includeFile = function(file, parent = null) {
    if(!file.endsWith('.js')) return;
    if(!fs.existsSync(file) || !fs.lstatSync(file).isFile()) return;

    if(!parent) parent = module.exports;
    let key = path.basename(file, '.js');
    parent[key] = fs.readFileSync(file, 'utf8').toString();
}

module.exports.__requireFile = function(file, parent = null) {
    if(!file.endsWith('.js')) return;
    if(!fs.existsSync(file) || !fs.lstatSync(file).isFile()) throw new Error(`File "${file}" does not exist.`);
    module.exports.__includeFile(file, parent);
}