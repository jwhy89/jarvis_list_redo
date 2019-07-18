-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "timestamp" TIMESTAMP default current_timestamp
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
		
-- TEST DATA
INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "status_id", "active")
Values ('Harusame', 'Sword of Light: personal sword of Amidamaru and later the main medium used for Over Soul', '04-22-2019', null, 'https://vignette.wikia.nocookie.net/shamanking/images/c/c8/Harusame_Museum.jpg/revision/latest?cb=20110823122358&path-prefix=en', 1, 1, null, 2, 1, 2, true);

INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "status_id", "active")
Values ('Antiquity', 'Futsunomitama no Tsurugi; the Futsunomitama Sword', '04-23-2019', null, 'https://vignette.wikia.nocookie.net/shamanking/images/3/32/Stone_Sword.jpg/revision/latest?cb=20110823110050&path-prefix=en', 1, 1, null, 2, 1, 4, true);

INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "status_id", "active")
Values ('Shoulder Guard', 'shoulder guard and arm shield', '04-24-2019', null, 'https://vignette.wikia.nocookie.net/shamanking/images/1/1f/Amidamaru_Oversoul_2.jpg/revision/latest/scale-to-width-down/200?cb=20090513173151&path-prefix=en', 1, 1, null, 1, 1, 1, true);

INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "status_id", "active")
Values ('Shuriken', 'Sharpened, four-pronged metal stars, useful for throwing.', '03-22-2019', 5, 'https://images-na.ssl-images-amazon.com/images/I/61eJJ%2BPqfIL._SX425_.jpg', 3, 1, null, 2, 2, 3, true);

INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "status_id", "active")
Values ('Kunai', 'One of the most common tools used by shinobi. It is a black dagger with a handle wrapped in bandages and a circular end', '04-23-2019', 10, 'https://images-na.ssl-images-amazon.com/images/I/515AY9xzOcL._SX466_.jpg', 1, 1, null, 2, 2, 4, true);

INSERT INTO "stuff" ("name", "description", "last_used", "price", "image_url", "quantity", "physical_or_digital_id", "physical_location_id", "quantity_type_id", "user_id", "status_id", "active")
Values ('Forehead Protector', 'A headband composed of a metal plate and a band of cloth.', '04-23-2019', 10, 'https://ae01.alicdn.com/kf/HTB1rJ1aNFXXXXccXXXXq6xXFXXXT/Black-Naruto-Leaf-Village-Logo-Metal-Plated-Headband-Forehead-Protector-Cosplay-Accessories.jpg', 1, 1, null, 2, 2, 5, true);

-- GET REQUEST
SELECT "stuff"."id", "stuff"."name" AS "stuff_name", "stuff"."description", "stuff"."quantity", "quantity_type"."type" AS "type", "physical_or_digital"."physical_state", "stuff"."last_used", "status"."status", "stuff"."active", "stuff"."image_url",
FROM "stuff"
JOIN "physical_or_digital" ON "stuff"."physical_or_digital_id" = "physical_or_digital"."id"
JOIN "quantity_type" ON "stuff"."quantity_type_id" =  "quantity_type"."id"
JOIN "user" ON "stuff"."user_id" = "user"."id"
JOIN "status" ON "stuff"."status_id" =  "status"."id" 
WHERE "stuff"."user_id" = $1
ORDER BY "stuff"."name" ASC;