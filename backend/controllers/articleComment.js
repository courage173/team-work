import Model from '../models/db';
import generateId from '../middlewares/identity'


const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

class ArticleComment {
    static model() {
        return new Model('articles');
      }

    static comment() {
      return new Model('article_comment');
    }

    static async createArticleComment(req,res){
        try{
            const {articleId }= req.params
            const createdBy = req.user.email
            const userId = req.user.userId
            const commentId = generateId(7444985)
            let {comment, flagged} = req.body
            const createdOn = dateTime


            const row = await ArticleComment.model().select('*', 'article_id=$1', [articleId]);
            if(!row[0]){
                return res.status(404).json({
                  status: "error",
                  data: {
                    message: "Article does not exist"
                  }
                })
              }
              if(!flagged){
                  flagged = false
              }
              if(!comment){
                return res.status(401).json({
                    status: "error",
                    message: "no comment provided"
                })
            }
            const rows = await ArticleComment.comment().insert('comment_id,article_id,comments,flagged,user_id,created_by, created_on',
             `'${commentId}','${articleId}','${comment}', '${flagged}','${userId}','${createdBy}','${createdOn}'`)

             return res.status(201).json({
                 status: "success",
                 data: {
                     message: "comment successfully created",
                     createdOn: rows[0].created_on,
                     articleTitle: row[0].title,
                     article: row[0].article,
                     comment: rows[0].comments

                 }
             })



            
        }catch (e) {
            return res.status(500).json({
              error: e.message,
              e
            });
          }
    }
}  

export default ArticleComment
