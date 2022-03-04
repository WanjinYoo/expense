var express = require('express');
var router = express.Router();
const ExpenseService = require("../service/expenseService");

module.exports = (db) => {
  var expenseService = new ExpenseService(db);

  router.get('/', async function (req, res, next) {
    expenseService.getAllExpenses()
      .then((result,err) => {
        if(err) {
          res.status(500).send(JSON.stringify(err));
        }
        res.send(result);

      });
  });
  router.post("/create", (req, res) => {
    if(!req.body[`categoryID`] || !req.body[`name`] || !req.body[`cost`]) {
      res.status(500).send('required fields are missing');
    }
    expenseService.createExpense(req.body[`name`],req.body[`cost`],req.body[`categoryID`])
    .then((result,err) => {
      if(err) {
        res.status(500).send(JSON.stringify(err));
      }
      res.send(result);
    });
  });


  router.post("/delete", (req, res) => {
    console.log(req.body);
    expenseService.deleteExpense(req.body[`id`])
    .then((result,err) => {
      if(err) {
        res.status(500).send(JSON.stringify(err));
      }
      res.send({sucess:true});
    });
  });

  return router;
}
