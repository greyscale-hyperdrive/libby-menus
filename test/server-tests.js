const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/application.js');

const should = chai.should();
chai.use(chaiHttp);

describe('CRUD operations', () => {
  it('should retrieve the menu data for restaurant 1 on GET request to that endpoint', (done) => {
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
  it('should add an item to the menu_items table on POST request to that endpoint', (done) => {
    chai.request(server)
      .post('/menus/restaurant/1/menu')
      .send({
        item_name: 'Chai Latte',
        item_description: 'With hints of mocha',
        item_price: 3.00,
        section_name: 'Breakfast',
        restriction_name: 'Vegetarian',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('string');
        res.body.should.equal('Data successfully posted');
        done();
      });
  });
  it('should update item price on PUT request to that endpoint', (done) => {
    chai.request(server)
      .get('/menus/restaurant/1/menu')
      .end((err, res) => {
        chai.request(server)
          .put('/menus/restaurant/1/menu/price')
          .send({
            item_id: res.body.rows[0].item_id,
            item_price: 3.00,
          })
          .end((err2, res2) => {
            res2.should.have.status(200);
            res2.body.should.be.a('string');
            res2.body.should.equal('Data successfully updated');
            done();
          });
      });
  });
  it('should delete an item on DELETE request to that endpoint', (done) => {
    chai.request(server)
      .get('/menus/restaurant/1/menu')
      .end((err, res) => {
        chai.request(server)
          .delete('/menus/restaurant/1/menu')
          .send({
            item_id: res.body.rows[0].item_id,
          })
          .end((err2, res2) => {
            res2.should.have.status(200);
            res2.body.should.be.a('string');
            res2.body.should.equal('Data successfully deleted');
            done();
          });
      });
  });
});

