const os = require('os');
const path = require('path');

const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function downloadCLI(url) {
  core.debug(`Downloading terraform-docs CLI from ${url}`);
  const pathToCLITar = await tc.downloadTool(url);

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
    const inputVersion = core.getInput('tfdocs_version');

    core.debug(`Getting download URL for terraform-docs version ${inputVersion}`);
    const url = `https://github.com/terraform-docs/terraform-docs/releases/download/${inputVersion}/terraform-docs-${inputVersion}-linux-amd64.tar.gz`;

    const pathToCLI = await downloadCLI(url);

    core.addPath(pathToCLI);

    // const matchersPath = path.join(__dirname, '..', '.github');
    // core.info(`##[add-matcher]${path.join(matchersPath, 'matchers.json')}`);

    return inputVersion;
  } catch (ex) {
    core.error(ex);
    throw ex;
  }
}

module.exports = run;