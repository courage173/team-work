import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

const pool = new Pool({ 
    user: 'kola',
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
    is_admin BOOLEAN NOT NULL DEFAULT false,
    department VARCHAR,
    jobroles VARCHAR,
    address VARCHAR,
    gender VARCHAR
);
INSERT INTO users (
    id, email, first_name, last_name, password, is_admin
    ) VALUES (
        15,
        'bosky@gmail.com',
        'faith',
        'osemwengie',
        'developer',
        true
);

DROP TABLE IF EXISTS gif CASCADE;
CREATE TABLE gif (
	gif_id serial NOT NULL,
	title varchar NOT NULL,
	gif_url varchar NOT NULL,
	created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    flagged BOOLEAN NOT NULL,
    created_by varchar NOT NULL,
    public_id varchar NOT NULL,
    user_id serial NOT NULL,
    PRIMARY KEY (gif_id),
    FOREIGN KEY (user_id) 
    REFERENCES users (id)
    );

    DROP TABLE IF EXISTS gif CASCADE;
    CREATE TABLE gif (
        gif_id serial NOT NULL,
        comment_id serial NOT NULL,
        comment varchar NOT NULL,        
        created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        flagged BOOLEAN NOT NULL,
        created_by varchar NOT NULL,
        user_id serial NOT NULL,
        PRIMARY KEY (comment_id),
        FOREIGN KEY (gif_id) 
        REFERENCES gif (gif_id)
        )


`);

export default migrate;