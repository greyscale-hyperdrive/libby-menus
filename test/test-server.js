const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/application.js');

const should = chai.should();
chai.use(chaiHttp);

describe('CRUD operations', () => {
  it('should retrieve the menu data for restaurant 1 on GET request to that endpoint', done => {
    chai.request(server)
    .get('/menus/restaurant/1/menu')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.command.should.equal('SELECT');
      done();
    });
  });
  it('should add an item to the menu_items table on POST request to that endpoint', done => {
    chai.request(server)
      .post('/menus/restaurant/1/menu')
      .end()
  });
  it('should provide a PUT request');
  it('should provide a DELETE request');
});

