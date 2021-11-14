const fs = require('fs');
const path = require('path');

module.exports.__includeDir = function(dir, parent = null) {
    if(!dir.endsWith('/')) dir += '/';
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

module.exports.__includeFile = function(file, parent = null) {
    if(!file.endsWith('.js')) return;
    if(!parent) parent = module.exports;
    let key = path.basename(file, '.js');
    parent[key] = fs.readFileSync(file, 'utf8').toString();
}