const fs = require('fs');

//const _ = require('lodash');
const ejs = require('ejs');

const viewDir = './views/';
const compiled = new Map();

module.exports = { render };

function renderOld(viewFile, ctx = {}) {
    fs.readFile(viewDir + viewFile + '.html', 'utf8', function(err, data) {
        if (!err) {
            return _.template(data)(ctx);
        }
        else console.log(err);
    })
}

function render(viewFile, data = {}) {
    let viewPath = viewDir + viewFile + '.html';
    let compiledFunc;
    if (compiled.has(viewPath)) {
        compiledFunc = compiled.get(viewPath);
        return compiledFunc(data);
    }
    else {
        fs.readFile(viewPath, 'utf8', function(err, fileData) {
            if (!err) {
                compiledFunc = ejs.compile(fileData, {filename: viewPath});
                compiled.set(viewPath, compiledFunc);
                return compiledFunc(data);
            }
            else console.log(err);
        });
    }
    
}