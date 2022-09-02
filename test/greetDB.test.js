const assert = require('assert');
const greeting = require('../greetingsdb');
const pgPromise = require('pg-promise')
const pg = require("pg");

const pgp = pgPromise({})


const local_database_url = 'postgres://codex:pg123@localhost:5432/greet';
const connectionString = process.env.DATABASE_URL || local_database_url;

const db = pgp(connectionString);
const myGreet = greeting(db)


describe(" The Greetings database factory function", async function () {



    beforeEach(async function () {
        await db.manyOrNone('delete from my_greetigs');

    });


    it("it should display nothing if the clear button is pressed and the are 5 names in the database", async function () {

        await myGreet.getNames("Ntsika")
        await myGreet.getNames("Siya")
        await myGreet.getNames("Zeze")
        await myGreet.getNames("Yanga")
        await myGreet.getNames("Zamo")

        await myGreet.clear()

        assert.deepEqual( [] ,await myGreet.getNames() )




    });

    it("it should clear all the greeted names in the database if the clear button is pressed and the are 3 names in the database", async function () {

        await myGreet.getNames("Khazimla")
        await myGreet.getNames("Asanda")
        await myGreet.getNames("Jurant")
        await myGreet.clear()


        assert.deepEqual( [] , await myGreet.getNames() )

    });
   
    it("it should select all the names in my table and return the length", async function () {

        await myGreet.storedNames("Khazimla");
        await myGreet.storedNames("Jurant");

        assert.equal(2, await myGreet.getCounter())
    });
   
   
    it("it should select the greeted name in my table and tell how many times the name was greeted'", async function () {

        await myGreet.storedNames("Khazimla");
        await myGreet.storedNames("Jurant");
        await myGreet.storedNames("Khazimla");
        await myGreet.storedNames("Khazimla");


        assert.deepEqual( {
            counter: 3,
            greeted_names: 'Khazimla'
          }
          , await myGreet.getUserCounter('Khazimla'))
    });
   
   
    it("it should show (0) if the are no names in the dataabse table", async function () {
        assert.equal(0, await myGreet.getCounter())
    });
   
   


    after(async function () {
        await db.manyOrNone('Truncate my_greetigs');
    });
})


