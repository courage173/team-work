import pool from '../config/config'
import Category from '../controllers/category';



class Model {
  constructor(table) {
    this.table = table;

    this.pool = pool

     this.pool.on('error', (err, client) => {
      console.log('error');
    });
  }
  async select(columns, clause, values) {
    try {
      let query;
      if (clause) {
        query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
      } else {
        query = `SELECT ${columns} FROM ${this.table}`;
      }
      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async selectOrder(columns, clause, values) {
    try {
      
      
       const query = `SELECT ${columns} FROM ${this.table} ORDER BY created_on DESC `;
      
      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async insert(columns, selector, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
    try {
      console.log(query);
      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  async update(columns, clause, values) {
    const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause} returning *`;
   

    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  

  async delete(clause, values) {
    const query = `DELETE FROM ${this.table} WHERE ${clause} returning *`;
    try {
      const { rows } = await this.pool.query(query,values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
 async getFeed() {
    const getFeed = `
              SELECT a."articleId" AS id, a.title, a."articleImage" AS "articleImage/url", c.category AS "category/public_id", a."createdOn", concat("firstName", ' ', "lastName") AS author FROM articles a INNER JOIN users u ON a."userId" = u."userId" INNER JOIN categories c ON a."categoryId" = c."categoryId"
              UNION
              SELECT g."gifId" AS id, g.title, g."imageUrl" AS "articleImage/url", g.public_id AS "category/public_id", g."createdOn", concat("firstName", ' ', "lastName") AS author FROM gifs g INNER JOIN users u ON g."userId" = u."userId" 
              ORDER BY "createdOn" DESC`;
    const { rows } = await this.pool.query(getFeed);
    return rows;
  }
  
}



export default Model;
