const program = require('commander');
const createTestCafe = require('testcafe');
const server = require('./utils/server');

program
  .option('-m, --mode <mode>', 'list of modes [watch, headless, ci]')
  .parse(process.argv);

if (['watch', 'headless', 'ci'].indexOf(program.mode) === -1) {
  throw new Error('Please enter a valid mode. Valid list of modes are watch, headless, ci');
}

let testcafe = null;

server.start();

const modeBrowserMapping = {
  watch: 'chrome',
  headless: 'chrome:headless',
  ci: 'chromium:headless --no-sandbox',
};

createTestCafe('localhost', 1337, 1338)
  .then((tc) => {
    testcafe = tc;
    const runner = testcafe.createRunner();

    return runner
      .src(['test/functional/journeys/**/*.spec.js'])
      .browsers(modeBrowserMapping[program.mode])
      .reporter('spec')
      .run();
  })
  .then((failedCount) => {
    // eslint-disable-next-line no-console
    console.log(`Tests failed: ${failedCount}`);
    server.stop().then(() => {
      testcafe.close();
      process.exit();
    });
  });
