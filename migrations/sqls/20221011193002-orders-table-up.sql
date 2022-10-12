/* Replace with your SQL commands */
CREATE TYPE StatusOfProduct AS ENUM('pending', 'fulfilled');
CREATE TABLE orders(
    id serial PRIMARY KEY, 
    user_id INTEGER NOT NULL REFERENCES users(id), 
    order_status StatusOfProduct NOT NULL 
)