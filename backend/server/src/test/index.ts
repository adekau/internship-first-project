import * as fs from 'fs';
import * as nodeunit from 'nodeunit';

const reporter = require('nodeunit').reporters.default;
let collection: string[] = [];

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.substr(file.length - 2) === "js" && (file != "index.js"));
    })
    .forEach(file => {
        collection.push(`${__dirname}/${file}`);
    })

reporter.run(collection);