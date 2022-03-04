var express = require('express');
var router = express.Router();
const CategoryService = require( "../service/categoryservice" );

module.exports = (db) => {
  var categoryService = new CategoryService(db);

  router.get('/', async function (req, res, next) {
    categoryService.getAllCategories()
      .then((result,err) => {
        if(err) {
          res.status(500).send(JSON.stringify(err));
        }
        res.send(result);

      });
  });
  router.post("/create", (req, res) => {
    if(!req.body[`name`]) {
      res.status(500).send('Required field is missing');
    }
    categoryService.createCategory(req.body[`name`])
    .then((result,err) => {
      if(err) {
        res.status(500).send(JSON.stringify(err));
      }
      res.send(result);
    });
  });


  router.post("/delete", (req, res) => {
    categoryService.deleteCategory(req.body.id)
    .then((result,err) => {
      if(err) {
        res.status(500).send(JSON.stringify(err));
      }
      res.send({sucess:true});
    });
  });
  return router;
}
