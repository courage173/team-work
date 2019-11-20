import Model from '../models/db';
import generateId from '../middlewares/identity'


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

    static async createGifComment(req,res){
        try{
            const {gifId }= req.params
            const createdBy = req.user.email
            const userId = req.user.userId
            const commentId = generateId(7444985)
            const {comment} = req.body
            let {flagged} = req.body
            const createdOn = dateTime


            const row = await GifComment.model().select('*', 'gif_id=$1', [gifId]);
            if(!row[0]){
                return res.status(404).json({
                  status: "error",
                  data: {
                    message: "Gif does not exist"
                  }
                })
              }
              if(!flagged){
                flagged = false;
              }
              if(!comment){
                return res.status(401).json({
                    status: "error",
                    message: "no comment provided"
                })
            }
            const rows = await GifComment.comment().insert('comment_id,gif_id,comments,flagged,user_id,created_by, created_on',
             `'${commentId}','${gifId}','${comment}', '${flagged}','${userId}','${createdBy}','${createdOn}'`)

             return res.status(201).json({
                 status: "success",
                 data: {
                     message: "comment successfully created",
                     createdOn: rows[0].created_on,
                     gifTitle: row[0].title,
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

export default GifComment