CREATE TABLE if not exists my_greetigs(
id SERIAL PRIMARY KEY,
greeted_names text NOT NULL,
counter int NOT NULL 
);
ALTER TABLE my_greetigs
ALTER COLUMN greeted_names data_type NOT NULL;



CREATE TABLE if not exists my_tests(
id SERIAL PRIMARY KEY,
greeted_names text NOT NULL,
counter int NOT NULL 
);

ALTER TABLE my_tests
ALTER COLUMN greeted_names data_type NOT NULL;
