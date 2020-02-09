import pool from '../config/config'





class FeedService {
    static async getFeed() {
      const getFeed = `
      SELECT a."article_id" AS id,a."flagged" as flagged, a.title, a."article" AS "article",a."gif" AS "gifUrl", c."category_name" AS "category/public_id", a."created_on", concat("first_name", ' ', "last_name") AS author,image_url as ImagUrl, array_agg(d."comments") as coments FROM articles a INNER JOIN users u ON a."user_id" = u."id" INNER JOIN categories c ON a."category_id" = c."category_id" FULL JOIN article_comment d ON a."article_id" = d."article_id"
         GROUP  BY a."article_id",
      u."first_name",u."last_name",c."category_name",u."image_url"
         UNION
      SELECT g."gif_id" AS id,g."flagged" as flagged, g.title,g."article" AS "article", g."gif_url" AS "gifUrl", g.public_id AS "category/public_id", g."created_on", concat("first_name", ' ', "last_name") AS author, image_url as ImagUrl, array_agg(e."comments") as coments FROM gif g INNER JOIN users u ON g."user_id" = u."id" FULL JOIN gif_comment e ON g."gif_id" = e."gif_id"
         GROUP  BY g."gif_id",
      u."first_name",u."last_name",g."public_id",u."image_url"

      ORDER BY "created_on" DESC`;
      const { rows } = await pool.query(getFeed);
      
      return rows;
    }
    static async getArticleComment(id) {
      const getCom = `select comments,comment_id,created_on,flagged,image_url,id,first_name from article_comment inner join users on user_id = id WHERE article_id = ${id} ORDER BY created_on ASC
      `;
      const { rows } = await pool.query(getCom);
      
      return rows;
    }
    static async getGifComment(id) {
      const getCom = `select comments,comment_id,created_on,flagged,image_url,id,first_name from gif_comment inner join users on user_id = id WHERE gif_id = ${id} ORDER BY created_on ASC
      `;
      const { rows } = await pool.query(getCom);
      
      return rows;
    }
  }
  export default FeedService;