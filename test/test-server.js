const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/application.js');
const should = chai.should();

chai.use(chaiHttp);

describe('CRUD operations', () => {
  it('should successfully perform a GET request', done => {
    chai.request(server)
    .get('/menus/restaurant/1/menu')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('should perform a POST request');
  it('should provide a PUT request');
  it('should provide a DELETE request');
});

