## Alaa Magdy

## start steps to make easy

### To install my dependencies and dev dependencies 

```
npm install
```
## To run The project using nodemon
```
npm start
```

## To Build Project
```
npm run build
```
## To Run Jasmine Tests
```
npm run test
```

### To run Eslint
```
npm run lint
```

### To fix Eslint
```
npm run lint:fix
```
## To run prettier
```
npm run prettify
```

### To run ts-watch
```
npm run watch
```

### IMPORTANT To run migrations
```
npm run db:up
```

### IMPORTANT To revoke last migration
```
npm run db:down
```
# Server Configuration 
- http://localhost:3000/

- port running 3000
# How To Connect On DataBase 
### SERER ROOT USER
```
psql -h localhost -U alaa postgres

```
### CREATE DATA_BASE
#
- ### Create 2 Databases 
```
CREATE DATABASE storefront;
```
```
CREATE DATABASE storefront_test;
```
## Connect_on_Two_DataBase

```
\c storefront

```

```
\c storefront_test

```
## Database Configuration PORT

- Default port  ``5432``

- Configure .env to fit your environment (look at .env.example).

#
 ### this hint if you have problems in running, Please make sure you have some packages globally  

  (for windows) to make ENV in jasmine and test scripts working
  ```
   ```
  npm install -g @dotenv
  ```
  npm install -g win-node-env
  ```

## -Testing For jasmine scripts problems use these

```
  npm install -g jasmine
  npm install -g jasmine-ts
  npm install -g @types/jasmine
```
-Steps in migration scripts use these

  ```
  npm install -g db-migrate

  npm install -g db-migrate-pg
  ```
  -Steps for node js with typescript
  ```
  npm install -g ts-node
  ```
  ## End steps 