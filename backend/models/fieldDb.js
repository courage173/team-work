import { Pool } from 'pg';

const pool = new Pool({
    user: 'kola',
    host: 'localhost',
    database: 'teamworkdb',
    password: 'pedro123',
    port: 5432,
})

class FeedService {
    static async getFeed() {
      const getFeed = `
                SELECT a."article_id" AS id, a.title, a."article" AS "articleImage/url", c.category_name AS "category/public_id", a."created_on", concat("first_name", ' ', "last_name") AS author FROM articles a INNER JOIN users u ON a."user_id" = u."id" INNER JOIN categories c ON a."category_id" = c."category_id"
                UNION
                SELECT g."gif_id" AS id, g.title, g."gif_url" AS "articleImage/url", g.public_id AS "category/public_id", g."created_on", concat("first_name", ' ', "last_name") AS author FROM gif g INNER JOIN users u ON g."user_id" = u."id" 
                ORDER BY "created_on" DESC`;
      const { rows } = await pool.query(getFeed);
      
      return rows;
    }
  }
  export default FeedService;