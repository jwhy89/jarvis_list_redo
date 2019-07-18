# Jarvis' List (Prime Solo Project)

Have you ever had too much stuff and can’t seem to find it or remember the last time you used it? Where is it? How many do I have left? These are all questions I am too familiar with. With my app, Jarvis’ List, worry no more. Jarvis’ List allows you to track, organize, and sort your stuff. With a user friendly interface that is designed with a responsive JavaScript library, React, my application aims to solve our day to day troubles of locating and using our precious stuff.

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `jarvis_list` and create the following `user, physical_or_digital, status, quantity_type, location, and stuff` tables:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- table for physical state of stuff
CREATE TABLE "physical_or_digital" (
    "id" SERIAL PRIMARY KEY,
    "physical_state" VARCHAR (80) NOT NULL
);

-- table for donate, keep, sell, store, toss
CREATE TABLE "status" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR (80) NOT NULL
);

-- table for quantity type, e.g. piece, bundle, container, quart
CREATE TABLE "quantity_type" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (80) NOT NULL
);

-- initial table for Google Maps API
CREATE TABLE "location" (
    "id" SERIAL PRIMARY KEY,
    "lat" NUMERIC,
    "lng" NUMERIC,
    "description" VARCHAR (200)
);

-- table for list of stuff
CREATE TABLE "stuff" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80),
    "description" VARCHAR (2500),
    "last_used" DATE,
    "price" MONEY,
    "image_url" varchar (2500),
    "quantity" NUMERIC(8, 2),
    "physical_or_digital_id" INT REFERENCES "physical_or_digital",
    "physical_location_id" INT REFERENCES "location",
    "quantity_type_id" INT REFERENCES "quantity_type",
    "user_id" INT REFERENCES "user" NOT NULL,
    "status_id" INT REFERENCES "status",
    "active" boolean
);

-- set up test values for initial development
INSERT INTO "status" ("status") 
VALUES ('Donate'),
	('Keep'),
	('Sell'),
	('Store'),
	('Toss');
		
INSERT INTO "physical_or_digital" ("physical_state") 
VALUES ('physical'), 
	('digital');
		
INSERT INTO "quantity_type" ("type") 
VALUES ('unit'), 
	('piece'),
	('bundle'),
	('container'),
	('quart');
```

If you would like to name your database something else, you will need to change `jarvis_list` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

* src/components
  * AddStuffForm/AddStuffForm
  * App/App
  * Footer/Footer
  * Gallery/Gallery
  * GalleryList/GalleryList
  * LoginPage/LoginPage
  * LogOutButton/LogOutButton
  * Nav/Nav
  * ProtectedRoute/ProtectedRoute
  * RegisterPage/RegisterPage
  * StuffDetails/StuffDetails
  * UserPage/UserPage

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## These are features I did not get to and would like to implement in the future.
There were many features that I did not get to within the assigned two weeks for the project. I would like to add the following features:

1. Uploading images.
2. Using the Google Maps API to add a location to the stuff.
3. Adding a Redux-Search feature to compile and build a Redux library for searching through the stuff reducer.
4. Making the application more mobile friendly.

## Acknowledgments

* Thank you to my fellow classmates in the Atbash Cohort.
* Thank you to Mary and Kris, our insightful and knowledgeable instructors!
