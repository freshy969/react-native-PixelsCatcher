/**
* Copyright (c) Maksym Rusynyk 2018 - present
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
/* @flow */
const fs = require('fs');
const path = require('path');

const log = require('./log');

const TAG = 'PIXELS_CATCHER::UTIL_READ_CONFIG';
const CONFIG_FILE = 'pixels-catcher.json';
const PACKAGE_JSON_FILE = 'package.json';

const readConfigFromPackageJSON = (): any => {
  const projectPackageFile = path.join(process.cwd(), PACKAGE_JSON_FILE);

  if (!fs.existsSync(projectPackageFile)) {
    log.e(TAG, `Cannot find ${PACKAGE_JSON_FILE} file [${projectPackageFile}]. `
     + 'Check that you started the script from the root of your application');
    process.exit(-1);
  }

  const fileContent = fs.readFileSync(projectPackageFile, 'utf8');

  return JSON.parse(fileContent).PixelsCatcher;
};

const readConfigFromFile = (): any => {
  const configFile = path.join(process.cwd(), CONFIG_FILE);

  if (!fs.existsSync(configFile)) {
    log.w(TAG, `Cannot find [${configFile}] file`);
    return undefined;
  }

  const fileContent = fs.readFileSync(configFile, 'utf8');

  return JSON.parse(fileContent);
};

module.exports = (platform: string) => {
  const pixelsCatcherConfig = readConfigFromPackageJSON() ||
    readConfigFromFile();

  console.log('pixelsCatcherConfig', pixelsCatcherConfig);

  if (!pixelsCatcherConfig) {
    log.e(TAG, 'Cannot find "PixelsCatcher" in package.json or find '
      + 'pixels-catcher.json file');
    process.exit(-1);
  }

  const config = pixelsCatcherConfig[platform];

  if (!config) {
    log.e(TAG, `Cannot find configuration for plarform [${platform}] in `
      + `config:\n ${JSON.stringify(pixelsCatcherConfig, null, 2)}`);
    process.exit(-1);
  }

  return config;
};
