var dotenv = require('dotenv');

dotenv.config();

var createBrowser = require('./common/browser');
var config = require('../src/config');
var schedule = require('../src/common/scheduler');
var jobs = require('../src/common/scheduler/job');

(async () => {
  try {
    console.log('start');
    const browser = await createBrowser();
    await browser.authenticate(config.auth);

    await schedule(
      [
        new jobs.FollowJob([[0, 5], [11, 14], [17, 21], [22, 23]]),
        new jobs.UnfollowJob([[6, 10], [13, 18], [21, 24]]),
      ],
      browser,
    );
  } catch (e) {
    console.log(e);
  }
})();
