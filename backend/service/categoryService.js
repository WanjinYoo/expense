class CategoryService {
 
    constructor (db) {
      // Create instance of Data Access layer using our desired model
      this.serviceInstance = db;
    }

    async createCategory(name) {
      const queryString = `
          INSERT INTO categories (name,isDeleted)
          VALUES ('${name}',0);`;
  
          return new Promise((success, failure) => {
            this.serviceInstance.query(queryString, function(err, result, fields) {
              console.log(err);
              if(err) {
                failure(err);
              } else {
                success(result);
              }
            });
          })
    };
    async deleteCategory(itemId){
     
      const queryString = `
      UPDATE categories
      SET isDeleted = 1
      WHERE id = ${itemId};`;
      return this.serviceInstance.query(queryString);
    };
  
    async getAllCategories () {
     const queryString = `
          SELECT *
          FROM categories
          WHERE isDeleted = 0
          ORDER BY id DESC;
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
  
  module.exports = CategoryService;