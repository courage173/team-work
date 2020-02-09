import Model from '../models/db';
import generateId from '../middlewares/identity'
import FeedService from '../models/fieldDb'


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
    static user() {
      return new Model('users');
    }

    static async createArticleComment(req,res){
        try{
            const {articleId }= req.params
            const createdBy = req.user.email
            const userId = req.user.userId
            const commentId = generateId(7444985)
            let {comment, flagged} = req.body
            const createdOn = dateTime
            console.log(req.body)


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
            
            const user = await ArticleComment.user().select('*', 'id=$1', [userId])
            console.log(user[0].image_url)
            const rows = await ArticleComment.comment().insert('comment_id,article_id,comments,flagged,user_id,created_by, created_on,image_ul,name',
             `'${commentId}','${articleId}','${comment}', '${flagged}','${userId}','${createdBy}','${createdOn}','${user[0].image_url}','${user[0].first_name}'`)
            
             
          
            
             return res.status(201).json({
                 status: "success",
                 data: {
                     message: "Posted successfully",
                     createdOn: rows[0].created_on,
                     commentId: rows[0].comment_id,
                     articleTitle: row[0].title,
                     article: row[0].article,
                     comment: rows[0].comments,
                     imageUrl: rows[0].image_ul,
                     imageUrl: rows[0].name

                 }
             })



            
        }catch (e) {
            return res.status(500).json({
              error: e.message,
              e
            });
          }
    }

  static async getArticleComment(req,res){
    try{
        const {articleId} = req.params;
        console.log(articleId)
        const rows  = await FeedService.getArticleComment(articleId)
        
        
        
        res.status(201).json({
          status: "success",
          data: rows
        })
    }catch (e) {
      return res.status(500).json({
        error: e.message,
        e
      });
    }
      
    }
    static async deleteArtComment(req,res){
      try{
          const {commentId} = req.params;
          //query DB for comments and send result
          const userId = req.user.userId
          const rows = await ArticleComment.comment().select('*', 'comment_id=$1', [commentId])
          if(userId !== rows[0].user_id){
            return res.status(401).json({
              status: "error",
              data: {
                message: "you dont have permission to delete comment"
              }
            })
          }
          const row = await ArticleComment.comment().delete('comment_id=$1', [commentId]);
          
          
          return res.status(201).json({
            status: "success",
            data: {
              message: "Comment deleted successfully",
              commentId: commentId
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
