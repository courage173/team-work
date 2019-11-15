import { createToken } from '../helpers/token';
import Model from '../models/db'
import cloudinary from 'cloudinary'
import generateId from '../middlewares/identity'


cloudinary.config({ 
    cloud_name: 'dm4gkystq', 
    api_key: '813183814586897', 
    api_secret: 'wOQOg1fVvOnekj16eUJv4ow0hm0' 
  });



class Gifs {
    static model() {
      return new Model('gif');
    }

    static async uploadGif(req,res){
        try{
          const file = req.files.image;
          console.log(file)
            const {title, flagged} =req.body;
            console.log(title)
            
            if(!title){
                res.status(400).json({message: "title required"})
            }
            const gifcloud = await cloudinary.v2.uploader.upload(file.tempFilePath);
            const {secure_url: secureUrl, created_at: createdOn, public_id: publicId } = gifcloud

            
            const identity = generateId(120000);
            console.log(req.user.email)
            const createdBy = req.user.email;
            const rows = await Gifs.model().insert(
                'gif_id,title,flagged, public_id,gif_url,created_by,created_on',
                `'${identity}', '${title}', '${flagged}', '${publicId}','${secureUrl}','${createdBy}', '${createdOn}'`
          );
    
          return res.status(201).json({
            status: 'success',
            data: {
              gif_id: identity,
              title: title,
              gif: secureUrl
            }
              
          });
        } catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };

    }
}  


export default Gifs