class expenseService {

  constructor(db) {
    this.serviceInstance = db;
  }

  async createExpense(name, cost,categoryid) {
    const queryString = `
        INSERT INTO expense (name,cost, isDeleted)
        VALUES ('${name}',${Number(cost)},false);
        INSERT INTO expense_categories (expense_id, categories_id) 
          VALUES(LAST_INSERT_ID(),${Number(categoryid)});
        `;

        return new Promise((success, failure) => {
          this.serviceInstance.query(queryString, function(err, result, fields) {
            if(err) {
              failure(err);
            } else {
              success(result);
            }
          });
        })
  };
  async deleteExpense(itemId) {
    const queryString = `
    UPDATE expense
    SET isDeleted = 1
    WHERE id = ${itemId};`;
    return new Promise((success, failure) => {
      this.serviceInstance.query(queryString, function(err, result, fields) {
        if(err) {
          failure(err);
        } else {
          success(result);
        }
      });
    })
  };

  async getAllExpenses() {
    const queryString = `
        SELECT expense.id,expense.cost,expense.name,categories.name as categoryName
        FROM expense
        JOIN expense_categories ON expense_id = expense.id
        JOIN categories ON categories.id = expense_categories.categories_id
        WHERE expense.isDeleted = 0
        ORDER BY expense.id DESC;
    `;
    return new Promise((success, failure) => {
      this.serviceInstance.query(queryString, function(err, result, fields) {
        if(err) {
          failure(err);
        } else {
          success(result);
        }
      });
    })
  }
}

module.exports = expenseService;