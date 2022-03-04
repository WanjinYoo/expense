DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id int (11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  isDeleted boolean NOT NULL,
  PRIMARY KEY (id)

);
