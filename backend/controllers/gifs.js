import { createToken } from '../helpers/token';
import Model from '../models/db'
import cloudinary from 'cloudinary'
import generateId from '../middlewares/identity'
import { constants } from 'fs';
var fs = require('fs');


cloudinary.config({ 
    cloud_name: 'dm4gkystq', 
    api_key: '813183814586897', 
    api_secret: 'wOQOg1fVvOnekj16eUJv4ow0hm0' 
  });



class Gifs {
    static model() {
      return new Model('gif');
    }
    static User() {
      return new Model('users');
    }
    static comment() {
      return new Model('gif_comment');
    }

    static async uploadGif(req,res){
        try{
       
 
         
          //console.log(req.body)
          
          
          const file = req.files.image;
          
            const {title, flagged} =req.body;
            
            
            if(file===null){
                return res.status(400).json({message: "File required"})
            }
            
            
            const gifcloud = await cloudinary.v2.uploader.upload(file.tempFilePath,{quality: 'auto',
              transformation: [
                {aspect_ratio: "4:3", crop: "fill"},
                {width: "auto", dpr: "auto", crop: "scale"}
                ]});
            const {secure_url: secureUrl, created_at: createdOn, public_id: publicId } = gifcloud

            
            const identity = generateId(120000);
            const userId = req.user.userId
            const createdBy = req.user.email;
            
            const rows = await Gifs.model().insert(
                'gif_id,title,flagged, public_id,gif_url,created_by,created_on,user_id','$1,$2,$3,$4,$5,$6,$7,$8',
                [identity, title, flagged, publicId,secureUrl,createdBy,createdOn,userId]
          );
    
          return res.status(201).json({
            status: 'success',
            data: {
              gifId: rows[0].gif_id,
              message: "gif image succesfully uploaded",
              createdOn: rows[0].created_on,
              title: rows[0].title,
              gifUrl: rows[0].gif_url
            }
              
          });
        } catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };

    }
    static async deleteGifs(req,res){
      try{
        const {gif_id} = req.params;
        
      const row = await Gifs.model().select('*', 'gif_id=$1', [gif_id]);
      

      if(!row[0]){
        return res.status(404).json({
          status: "error",
          data: {
            message: "Gif with required id not found"
          }
        })
      }

      const email = req.user.email
      const user_email = row[0].created_by

      if(user_email !== email){
        return res.status(401).json({
          status: "error",
          data: {
            message: "you dont have permission to delete required specified gif"
          }
        })
      }

      await cloudinary.v2.uploader.destroy(row[0].public_id);

       await Gifs.model().delete('gif_id=$1', [gif_id]);
       await Gifs.comment().delete('gif_id=$1', [gif_id]);
      return res.status(200).json({
        status: "success",
        data: {
          message: "gif post successfully deleted",
          id: gif_id
        }
      })

      
    } catch (e) {
      return res.status(500).json({
        error: e.message,
        e
      })
    };
}

static async getAllGifs(req,res){
  try{
    const row = await Gifs.model().selectOrder('*','created_on')
    
    res.status(200).json({
      status: "success",
      data: row
    })

  } catch(e){
    return res.status(500).json({
      error: e.message,
      e
    })

  }
}
static async getOneGif(req,res){
  try{
    const {id} = req.params;
     
    const row = await Gifs.model().select('*', 'gif_id=$1', [id]);
    if(!row[0]){
      return res.status(400).json({
        status: "error",
        error: "cannot find gif of required id"

      })
    }
    
    const name = await Gifs.User().select('*', 'id=$1', [row[0].user_id])
    return res.status(200).json({
      status: "success",
      data: {
        ArticleId: row[0].gif_id,
        createdOn: row[0].created_on,
        title: row[0].title,
        gifUrl: row[0].gif_url,
        createdBy: name[0].first_name + " " + name[0].last_name,
        imageUrl: name[0].image_url
      }
    })

  } catch(e){
    return res.status(500).json({
      error: e.message,
      e
    })

  }
}

}  


export default Gifs