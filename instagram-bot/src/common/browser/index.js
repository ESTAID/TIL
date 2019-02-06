var path = require('path');
var puppeteer = require('puppeteer');

function createBrowser() {
  const browser = puppeteer.launch({
    headless: false,
    args: ['--lang=en-US,en'],
  });

  const getUrl = (endpoint) => `https://www.instagram.com${endpoint}`;

  const getPage = (endpoint, fn) => {
    browser.then(async (browser) => {
      let page;
      let result;

      try {
        const url = getUrl(endpoint);
        console.log(url);
        page = await browser.newPage();

        await page.goto(url, { waitUntil: 'load'});

        await page.addScriptTag({
          path: path.join(__dirname, '../scraper/index.js')
        });

        page.on('console', msg => {
          const leng = msg.args().length;

          for (let i = 0; i < leng; i += 1) {
            console.log(`${i}: ${msg.args()[i]}`);
          }
        });

        result = await fn(page);
        await page.close();
      } catch(e) {
        if (page) {
          await page.close();
        }
  
        throw e;
      }
  
      return result;
    });
  }

  const close = async () => {
    await browser.close();
    browser = null;
  }

  return {
    authenticate: ({ username, password }) => {
      return getPage('/accounts/login', async page => {
        console.log('page function start');
        await page.waitForSelector('input[name="username"]',{ timeout: 1000 });

        const usernameInput = await page.$('input[name="username"]');
        const passwordInput = await page.$('input[name="password"]');
        if (!usernameInput || !passwordInput) {
          console.log('no input type');
        }
        await usernameInput.type(username, { delay: 100 });
        await passwordInput.type(password, { delay: 100 });

        const logInButtonSelector = await page.evaluate(() => {
          const { scraper } = window;
          /** 구글 세팅이 영어일 경우 text: 'Log in'으로 바꿔줘야함*/
          const logInButton = scraper.findOneWithText({
            selector: 'button',
            text: '로그인',
          });

          if (!logInButton) {
            return '';
          }

          return logInButton
            .setscraperAttr('logInButton', 'logInButton')
            .getSelectorByscraperAttr('logInButton');
        });

        if (!logInButtonSelector) {
          throw new Error('버튼을 클릭할 수 없습니다. 다시 확인해주세요.');
        }

        const logInButton = await page.$(logInButtonSelector);

        await logInButton.click();

        await page.waitFor(5000);
      });
    }
  }
}

module.exports = createBrowser;
