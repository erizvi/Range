/**
 * 
 * This script file adds the .js file extention to the import/export
 * statements in the generated JavaScript files via tsc.
 * 
 * Nodejs treats .js files as es modules when "type":"module" is 
 * specified in the package.json file. However in node, when importing
 * an ES Module, you need to have the .js file extenions. 
 * 
 * A workaround it to include the .js extension in the typescript source 
 * code. This works just fine, however, then the tests which are run via 
 * jasmine were breaking plus the test command which is run using
 * ts-node was also breaking. 
 * 
 * So the workaround for now is to run this post build script
 * which adds the .js extension to any import and export statements.
 * 
 * 
 * 
 */


"use strict";

import FileHound from 'filehound';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
//const FileHound = require('filehound');
//const fs = require('fs');
//const path = require('path');

const files = FileHound.create()
  .paths(__dirname + '/../dist')
  .ext('js')
  .find();


files.then((filePaths) => {

  filePaths.forEach((filepath) => {
    fs.readFile(filepath, 'utf8', (err, data) => {


      if (!data.match(/(import|export) .* from/g)) {
        return
      }
      let newData = data.replace(/(import .* from\s+['"])(.*)(?=['"])/g, '$1$2.js');
      newData = data.replace(/(export .* from\s+['"])(.*)(?=['"])/g, '$1$2.js');
      if (err) throw err;

      console.log(`writing to ${filepath}`)
      fs.writeFile(filepath, newData, function (err) {
        if (err) {
          throw err;
        }
        console.log('complete');
      });
    })

  })
});