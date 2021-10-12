const os = require('os');
const path = require('path');

const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function downloadCLI(url) {
  core.debug(`Downloading terraform-docs CLI from ${url}`);
  const pathToCLIZip = await tc.downloadTool(url);

  core.debug('Extracting terraform-docs CLI zip file');
  const pathToCLI = await tc.extractTar(pathToCLITar);
  core.debug(`terraform-docs CLI path is ${pathToCLI}.`);

  if (!pathToCLITar || !pathToCLI) {
    throw new Error(`Unable to download terraform-docs from ${url}`);
  }

  return pathToCLI;
}

async function run() {
  try {
    const inputVersion = core.getInput('tflint_version');

    core.debug(`Getting download URL for tflint version ${version}: ${platform} ${arch}`);
    const url = `https://github.com/terraform-docs/terraform-docs/releases/download/${version}/terraform-docs-${version}-linux-amd64.tar.gz`;

    const pathToCLI = await downloadCLI(url);

    core.addPath(pathToCLI);

    // const matchersPath = path.join(__dirname, '..', '.github');
    // core.info(`##[add-matcher]${path.join(matchersPath, 'matchers.json')}`);

    return version;
  } catch (ex) {
    core.error(ex);
    throw ex;
  }
}

module.exports = run;