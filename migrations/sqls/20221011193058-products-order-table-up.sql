/* Replace with your SQL commands */
CREATE TABLE products_order (
  product_id INTEGER NOT NULL REFERENCES products(id) ,
  order_id   INTEGER NOT NULL REFERENCES orders(id),
  quantity   INTEGER NOT NULL, 
  PRIMARY KEY(product_id, order_id)
)