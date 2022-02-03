const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
fs = require('fs');
const { db, jwt_rounds, jwt_secret } = require('../conf');
const passport = require('passport');
require('../passport-strategies');

router.post('/castorama', async (req, res) => {
  const vgmUrl = `https://www.castorama.fr/search?term=${req.body.idProduit}`;
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(vgmUrl);

    console.log('start');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    // await page.goBack();

    const data = await page.evaluate(
      () =>
        document.querySelector(
          '#content > div > div._6a4735bf > div > div._32739dfb > div.cfff3e27._2658d598.e09775ca > div > main > div > section > div.fef30cae._5e7ce7a9._461d0ef9.d4281212 > div._5c442f8c._6c656aee._63a088fa._16507d1d > div.fef30cae._5db60f3e.eb93678b.c0e684dd._5038abd1 > div:nth-child(3) > div > div:nth-child(1) > div > span:nth-child(1)'
        ).outerHTML
    );

    console.log(data);

    // await browser.close();
    dataReg = data.replace(/^<span>|&nbsp;€<\/span>$/g, '');
    res.send(dataReg);
  })();
});
// 5425035000040
// 4260215860301
// 80117277

router.get('/', passport.authenticate('jwt'), async (req, res) => {
  const [sqlRes] = await db.query(
    `
    SELECT idTracker, iduser , products.name , reference, stores.name, user.mail
    FROM Trackers.Trackers
    join
    products on idproduct=_idproducts
    join
    stores on idstore=stores_idstore
    join
    user on user.id=Trackers.iduser
    WHERE user.mail="p"
    `,
    [req.user.mail]
  );
  res.status(200).send(sqlRes);
});
module.exports = router;

// https://www.castorama.fr/search?term=5425035000040
