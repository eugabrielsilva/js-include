# js-include
This library allows you to include, in-place, common Javascript files (not modules) into your Node.js application and evaluate their script in the global namespace, kind like PHP does.

### Installation
```
npm install @eugabrielsilva/js-include
```

### Usage (single file)
```js
// Declare the module
const includes = require('@eugabrielsilva/js-include');

// Include the file
includes.__includeFile('./inc/myfile.js');
eval(includes.myfile);
```

### Usage (directory)
```js
// Declare the module
const includes = require('@eugabrielsilva/js-include');

// Include the directory
includes.__includeDir('./inc');

for (let file in includes.inc) {
    eval(includes.inc[file]);
}
```

### Credits
Library developed and currently maintained by [Gabriel Silva](https://github.com/eugabrielsilva).