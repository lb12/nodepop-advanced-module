# Nodepop
**Nodepop** is a project to try a simple API for a Wallapop like backend app


## Configure project
First of all, clone the repo and install dependencies with npm

```
$ git clone https://github.com/lb12/nodepop-advanced-module
$ cd nodepop
$ npm install
```

### Database configuration
By default, the app asumes that you have a MongoDB instance on localhost in the default port.

If you do not have a have a running MongoDB server on localhost at the default port, you need to install and launch one.

If you need more info on MongoDB you can visit the official doc:

* [Install MongoDB](https://docs.mongodb.com/manual/installation/)

## Loading initial sample data into DB
You can use `npm run install_db` to clean all the adverts and users in database and populate it with sample data (8 sample adverts, 1 sample user), from `data/sample_adverts.json` and `sample_users.json` files.

`sample_adverts.json` contains an array of adverts with the Advert model fields:

* **name**: string. Article name.
* **for_sale**: boolean. true for sales and false for wanted articles.
* **price**: number. Sale price or max. price for searches.
* **photo**: string. Name of the image advert file. Located in `public/images/`
* **tags**: array of string. Only '*work*', '*mobile*', '*motor*' and '*lifestyle*' are valid tags.


`sample_users.json` contains an array of users with the User model fields:

* **email**: string. User email.
* **password**: string. plain password that is hashed before insert into the DB.


## Running server for development
Once the project is configured you should run express with *nodemon* t start server and do any request you want. *Nodemon* reloads server with changes, so you don't need to reload it manually.

```
// In nodepop root folder
$ npm run dev
```

Previous command runs express through nodemon on `port 3000`.

Now you can access `http://localhost:3000` to see the home page of the website and see there some adverts paginated.

## Website translation
The website is translated using the `i18n` dependency. Spanish (`es`) and english (`en`) are the languages that you can use now to see the web.

A cookie is setted up to *save* the chosen language, but by default, the language is setted with your browser settings.

## API description

### JWT authentication

API is authenticated with **JWT**. With the sample user credentials, you can do login and get a token that must to use to see the adverts via API or get the tags.

A request <u>without token</u> or with a <u>expired token</u> will be answered with a HTTP 401 and with an error message.

### API documentation
API documentation is made using **Swagger**, code functions are documented using JSDoc style.

You can visit the API documentation (and **try it**) visiting on `http://localhost:3000/api-v1/docs`

### Adverts filters

* by **tag** (*tag*): search including a tag condition.
* by **advert type** (*for_sale*) : for sale or wanted article.
* by **price range** (*price*): min. price and max. price :  
  * `min-max` : adverts whose price is between those params.
  * `min-` : adverts whose price is higher than `min` value.
  * `-max` : adverts whose price is lower than `max` value.
  * `value` : adverts whose price is equal to the `value`.
* by **name** (*name*): search articles whose name starts with the `name` param.

### Pagination filters
You can see different adverts with pages filters. 
* by **page** (*page*): indicates which page of adverts you want tosee.
* by **limit** (*limit*): indicates how many adverts are shown.   
* by **sort**  (*sort*): indicates which is the advert field to sort the results (e.g. 'price').

An example of a query with filters could be next one: 
```
GET
http://localhost:3000/api-v1/adverts?tag=mobile&for_sale=false&name=ip&price=50-&page=0&limit=3&sort=price
```

## What can you do right now
This project let you:

* Authenticate (`POST /api-v1/authenticate`) that returns a JWT token
* Using that token you can interact with the API:
  * Create an advert (`POST /api-v1/adverts`)
  * See all the adverts in database using the API (`GET /api-v1/adverts`) or browser (`/adverts`)
  * See all the existing tags using the API (`GET /api-v1/tags/distinct`)

When you see the adverts, like it was said before, you can filter as you want (adverts filters and pagination filters)


### Code checking
ESLint was added like dependency to check errors or warnings in the code. You can run it using `npm run lint`