const gitHelper = require('./git');

describe('Git Helper', () => {
  it('Retrieve last commit short hash', () => {
    const output = gitHelper.getCommitShortHash();
    expect(output).toMatch(/^[a-z0-9]{7}$/gmi);
  });
  it('Retrieve last commit hash', () => {
    const output = gitHelper.getCommitHash();
    expect(output).toMatch(/^[a-z0-9]{40}$/gmi);
  });
  it('Retrieve last commit datetime', () => {
    const output = gitHelper.getCommitTime();
    const processedDate = new Date(Date.parse(output));
    expect(output).toEqual(processedDate.toISOString());
  });
  it('Retrieve last build datetime', () => {
    const output = gitHelper.getBuildTime();
    const processedDate = new Date(Date.parse(output));
    expect(output).toEqual(processedDate.toISOString());
  });
});
