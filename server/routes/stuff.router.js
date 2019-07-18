const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for GalleryList
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "stuff"."id", "stuff"."name" AS "stuff_name", "stuff"."description", "stuff"."quantity", "stuff"."image_url",
               "quantity_type"."type" AS "type", "physical_or_digital"."physical_state", "stuff"."last_used", "status"."status", "stuff"."active"
                FROM "stuff"
                JOIN "physical_or_digital" ON "stuff"."physical_or_digital_id" = "physical_or_digital"."id"
                JOIN "quantity_type" ON "stuff"."quantity_type_id" =  "quantity_type"."id"
                JOIN "user" ON "stuff"."user_id" = "user"."id"
                JOIN "status" ON "stuff"."status_id" =  "status"."id" 
                WHERE "stuff"."user_id" = $1
                ORDER BY "stuff"."last_used" ASC;`, [req.user.id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for stuff:', error);
            res.sendStatus(500);
        });
});

// GET route for StuffDetails
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    const user_id = req.user.id;
    const id = req.params.id
    console.log(`Stuff details with id=${id}`);
    const queryText = `SELECT "stuff"."id", "stuff"."name", "stuff"."description", 
                    "stuff"."quantity", "quantity_type"."type" AS "type", "stuff"."quantity_type_id",
                    "stuff"."physical_or_digital_id", "physical_or_digital"."physical_state", 
                    "stuff"."physical_location_id", "stuff"."status_id", "stuff"."last_used", 
                    "status"."status", "stuff"."active", "stuff"."price", "stuff"."image_url"
                    FROM "stuff"
                    JOIN "physical_or_digital" ON "stuff"."physical_or_digital_id" = "physical_or_digital"."id"
                    JOIN "quantity_type" ON "stuff"."quantity_type_id" =  "quantity_type"."id"
                    JOIN "user" ON "stuff"."user_id" = "user"."id"
                    JOIN "status" ON "stuff"."status_id" =  "status"."id" 
                    WHERE "stuff"."id" = $1 AND "stuff"."user_id" = $2;`;
    pool.query(queryText, [id, user_id])
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
            console.log('there is an error in getting your stuff details', err);
            res.sendStatus(500);
        });
});

// GET route for physical_or_digital table
// used to map the state of the item, if the item is a physical one or digital
router.get('/pd', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "physical_or_digital" ORDER BY "id";`;
    pool.query(queryText)
      .then((result) => { 
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error getting pd data', err);
        res.sendStatus(500);
      });
});

// GET route for status table
// Used to map the status of the stuff
// Status: Donate, Keep, Sell, Store, Toss
router.get('/status', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "status" ORDER BY "id";`;
    pool.query(queryText)
      .then((result) => { 
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error getting status data', err);
        res.sendStatus(500);
      });
});

// GET route for quantity_type table
// Used to map the type of stuff
// Quantity types include: unit, piece, bundle, container, quart
router.get('/type', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "quantity_type" ORDER BY "id";`;
    pool.query(queryText)
      .then((result) => { 
          res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error getting type data', err);
        res.sendStatus(500);
      });
});

/**
 * POST route for adding new stuff for database
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const newStuff = req.body;
    const user_id = req.user.id;
    const queryText = `INSERT INTO stuff ("name", "description", "last_used", "price", "image_url", "quantity", 
                      "physical_or_digital_id", "quantity_type_id", "status_id", "active", "user_id")
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    pool.query(queryText, [newStuff.name,
        newStuff.description,
        newStuff.last_used,
        newStuff.price,
        newStuff.image_url,
        newStuff.quantity,
        newStuff.physical_or_digital_id,
        newStuff.quantity_type_id,
        newStuff.status_id,
        newStuff.active,
        user_id])
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing ADD stuff query', err);
            res.sendStatus(500);
        });
});

/**
 * PUT route for editing stuff for database
 */
router.put('/details/:id', rejectUnauthenticated, (req, res) => {
    const editStuff = req.body;
    console.log('in put router', editStuff);
    const user_id = req.user.id;
    const queryText = `UPDATE stuff SET "name" = $1, "description" = $2, "last_used" = $3, "price" = $4, "image_url" = $5, "quantity" = $6, 
                      "physical_or_digital_id" = $7, "quantity_type_id" = $8, "status_id" = $9, "active" = $10
                      WHERE "id"= $11 AND "user_id" = $12`;
    pool.query(queryText, [editStuff.name,
        editStuff.description,
        editStuff.last_used,
        editStuff.price,
        editStuff.image_url,
        editStuff.quantity,
        editStuff.physical_or_digital_id,
        editStuff.quantity_type_id,
        editStuff.status_id,
        editStuff.active,
        editStuff.id,
        user_id])
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing ADD stuff query', err);
            res.sendStatus(500);
        });
});

// DELETE route for stuff
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(`Deleting stuff with id=${id}`);
    const queryText = 'DELETE FROM "stuff" WHERE id =$1';
    pool.query(queryText, [id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('there is an error in deleting your stuff', err);
            res.sendStatus(500);
        });
});

module.exports = router;