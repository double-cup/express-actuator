const {execSync} = require('child_process');

const getCommitShortHash = () => {
  return execSync('git rev-parse --short HEAD').toString().trim();
};
const getCommitHash = () => {
  return execSync('git rev-parse HEAD').toString().trim();
};
const getCommitTime = (commitId = '') => {
  const date = execSync(`git log -1 --date=iso --format=%cD ${commitId}`).
      toString().
      trim();
  return new Date(date).toISOString();
};
const getBuildTime = () => {
  const commitDetails = execSync(
      'git log -L 3,3:package.json --pretty=oneline').
      toString().
      trim();
  const commitMatch = commitDetails.match(/^([a-z0-9]+)/gmi);
  const [commitId] = commitMatch;
  return getCommitTime(commitId);
};

module.exports = {
  getCommitShortHash,
  getCommitHash,
  getCommitTime,
  getBuildTime,
};
