import cheerio from 'cheerio';

const basePath = '/';

describe('the about page', () => {
  it('has the header on the page', (done) => {
    request
      .get(basePath)
      .end(global.supertestHelper((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;

        const $ = cheerio.load(res.text);
        expect($('h2').text()).to.equal('Isomorphic Redux Demo');
      }, done));
  });
});
