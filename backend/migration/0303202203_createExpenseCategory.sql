DROP TABLE IF EXISTS expense_categories;

CREATE TABLE expense_categories (
  expense_id INTEGER REFERENCES expense(id) ON DELETE CASCADE,
  categories_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (expense_id,categories_id)
);