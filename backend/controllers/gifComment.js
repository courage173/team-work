import Model from '../models/db';
import generateId from '../middlewares/identity'
import FeedService from '../models/fieldDb'


const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

class GifComment {
    static model() {
        return new Model('gif');
      }

    static comment() {
      return new Model('gif_comment');
    }
    static user() {
      return new Model('users');
    }

    static async createGifComment(req,res){
        try{
            const {gifId }= req.params
            const createdBy = req.user.email
            const userId = req.user.userId
            const commentId = generateId(7444985)
            const {comment} = req.body
            let {flagged} = req.body
            const createdOn = dateTime
            console.log(gifId)

          //Check if Gif exist
            const row = await GifComment.model().select('*', 'gif_id=$1', [gifId]);
            if(!row[0]){
                return res.status(404).json({
                  status: "error",
                  data: {
                    message: "Gif does not exist"
                  }
                })
              }
              //check if its flag if not assign to false
              if(!flagged){
                flagged = false;
              }
              //check if there is comment
              if(!comment){
                return res.status(401).json({
                    status: "error",
                    data: {
                      message: "no comment provided"
                    }
                })
            }
            //get user image and first name from Users table
            const user = await GifComment.user().select('*', 'id=$1', [userId])
            //store in DB
            const rows = await GifComment.comment().insert('comment_id,gif_id,comments,flagged,user_id,created_by, created_on,image_ul,name',
             `'${commentId}','${gifId}','${comment}', '${flagged}','${userId}','${createdBy}','${createdOn}','${user[0].image_url}','${user[0].first_name}'`)

             return res.status(201).json({
                 status: "success",
                 data: {
                     message: "comment successfully created",
                     createdOn: rows[0].created_on,
                     gifTitle: row[0].title,
                     comment: rows[0].comments,
                     imageUrl: rows[0].image_ul,
                     firstName: rows[0].name,
                     commentId: rows[0].comment_id
                 }
             })



            
        }catch (e) {
            return res.status(500).json({
              error: e.message,
              e
            });
          }
      
    }

    static async getGifComment(req,res){
      try{
          const {gifId} = req.params;
          //query DB for comments and send result
          const rows  = await FeedService.getGifComment(gifId)
          
          
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
      static async deleteGifComment(req,res){
        try{
            const {commentId} = req.params;
            //query DB for comments and send result
            console.log(req.params)
            const userId = req.user.userId
            const rows = await GifComment.comment().select('*', 'comment_id=$1', [commentId]);
             console.log("kola" + commentId)
            if(userId !== rows[0].user_id){
              return res.status(401).json({
                status: "error",
                data: {
                  message: "you dont have permission to delete comment"
                }
              })
            }
            const row = await GifComment.comment().delete('comment_id=$1', [commentId])
            
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

export default GifComment