import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

const pool = new Pool({ 
    user: 'postgres',
    host: 'localhost',
    database: 'teamworkdb',
    password: 'pedro123',
    port: 5432,
 });

pool.on('error', (err) => {
  console.log(err);
});

const migrate = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
	email VARCHAR NOT NULL,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO users (
    id, email, first_name, last_name, password, is_admin
    ) VALUES (
        'bosky@gmail.com',
        'faith',
        'osemwengie',
        'developer',
        true
);

`);

export default migrate;