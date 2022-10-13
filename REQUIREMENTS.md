# Alaa Api REQUIREMENTS

# Requirements Should have in API

## Tables

## products

 Columns       |            Type
-------------  | ----------------------
  id           |     integer
  name         |     varchar(200)
  password     |     varchar(200)
  category     |     varchar(200)
  price        |     integer

---------------------------------------

## users

 Columns       |            Type
-------------  | ---------------------
  id           |     integer
  userName     |     varchar(200)
  password     |     varchar(200)
  firstName    |     varchar(200)
  lastName     |     varchar(200)

--------------------------------------

## Products_Order

 Columns      |        Type
------------- | ------------------
  product_id  |     integer (FK)
  order_id    |     integer (FK)
  quantity    |     integer
 
-------------------------------------

## Orders
 Columns       |            Type
-------------  | -----------------------
  id           |     integer
  user_id      |     integer (FK)
  order_status |     StatusOfProduct ENUM('pending', 'fulfilled')

-----------------------------------------------------------------

## API Endpoints

### HINT Important Note ABOUT AUTHORIZATION : 
```
Please Don't forget to put Bearer token after getting it from login user in Postman's Header Authorization
like this for example :

```
Authorization       Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImFsYWEiLCJmaXJzdG5hbWUiOiJBbGFhIiwibGFzdG5hbWUiOiJNYWdkeSIsInBhc3N3b3JkIjoiJDJiJDEwJGtGc1lvU2tNaHRSNEpxY0sxZlNlWC5UemxFenpzYWNsUjJGeXlqTC5xeGthSHouNlBKM2EuIn0sImlhdCI6MTY2NTYwODkyOH0.tgnNLfhZ2AoxSh3YDTOAvsY31g8vy7f-paJZE5p1M1E

```
## users

- createUser(post)  = http://localhost:3000/users/create                   
- Example in postman

```
{
      "userName": "alaa",
      "password": "Alaa1234",
      "firstName": "Alaa",
      "lastName": "Magdy"
}

```
- login(post) = http://localhost:3000/users/login       
- getUser(get) [token required] = http://localhost:3000/users/:id        
- updateUser(put) [token required] => http://localhost:3000/users/:id      
- Index(get) [token required] = http://localhost:3000/users           


## products

- createProduct(post)  = http://localhost:3000/products/create                   
- Example in postman
```
{
      "product_name": "shoes",
      "price": 800,
      "category" :"shoeRoom"
}

```
- Index(get) [token required] = http://localhost:3000/products           
- updateProduct(put) [token required] => http://localhost:3000/products/update/:id      
- getProductsInCategory(get) [token required] = http://localhost:3000/products/category/:category              
- getProduct(get) [token required] = http://localhost:3000/products/:id  
- deleteProduct(delete)  = http://localhost:3000/products/:id                   
                   
## orders

- createOrder(post)= http://localhost:3000/orders/create
- Example in postman

```
{
    "user_id": 1,
    "order_status": "pending",
    "products": [
        {
            "product_id": 1,
            "quantity": 100
        }
    ]
}

```
- CurrentUserOrder(get)  = http://localhost:3000/orders/user    
- UserDoneOrders(get)  = http://localhost:3000/orders/user/completed  

```

## End Alaa Api REQUIREMENTS