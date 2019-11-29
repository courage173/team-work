import { createToken,verifyToken } from '../helpers/token';
import Model from '../models/db'
import cloudinary from 'cloudinary'


import pass from '../helpers/password';

cloudinary.config({ 
  cloud_name: 'dm4gkystq', 
  api_key: '813183814586897', 
  api_secret: 'wOQOg1fVvOnekj16eUJv4ow0hm0' 
});

class User {
  static model() {
    return new Model('users');
  }



  static async signUp(req, res) {
    try {
        const {
          email, first_name, last_name,is_admin, jobroles,department,gender,address
        } = req.body;
  
        let { password } = req.body;
        
        const token = createToken({
          email,is_admin,is_admin
        });
        password = pass.hashPassword(password);
        const rows = await User.model().insert(
          'email, first_name, last_name, password, is_admin, jobroles, department, gender, address',
          `'${email}', '${first_name}', '${last_name}', '${password}', '${is_admin}', '${jobroles}', '${department}', '${gender}', '${address}'`
        );
  
        return res.status(201).json({
          status: 'success',
          data: {
            id: rows[0].id,
            is_admin: rows[0].is_admin,
            token,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            email: rows[0].email,
            department: rows[0].department,
            jobroles: rows[0].jobroles
          }
        });
      } catch (e) {
        return res.status(500).json({
          error: e.message,
          e
        });
      }
    }
    static async signIn(req, res) {
      try {
        const { email, password } = req.body;
        console.log(email)
        
        const registered = await User.model().select('*', 'email=$1', [email]);
  
        if (registered[0] && pass.decryptPassword(password, registered[0].password)) {
          const isAdmin = registered[0].is_admin;
          const userId = registered[0].id;
          const firstName = registered[0].first_name;
          const lastName = registered[0].last_name;
          const token = createToken({ email, isAdmin, userId });
          
          return res.status(200).json({
            status: 'success',
            data: {
              user_id: registered[0].id,
              is_admin: registered[0].is_admin,
              token,
              first_name: registered[0].first_name,
              last_name: registered[0].last_name,
              email: registered[0].email
              
            }
            
          });
          
        } return res.status(401).json({
          errors: {message: 'invalid email or password'}
          
        });
      } catch (e) {
        return res.status(500).json({
          error: 'server error',
          e
        });
      }
    }
    static async uploadPic(req,res){
      try{
        const file = req.files.image;
        console.log(file)
          
                   
          const userId = req.user.userId
          const user = await User.model().select('*', 'id=$1', [userId])
          if(!user[0]){
            return res.status(400).json({error: "you don't have permission to perform this"})
          }
          const imagecloud = await cloudinary.v2.uploader.upload(file.tempFilePath);
          const {secure_url: secureUrl} = imagecloud
          const rows = await User.model().update('image_url=$1','id=$2', [`${secureUrl}`, `${userId}`])
          return res.status(201).json({
            status: 'success',
            data: {
              imageUrl: secureUrl
            }
              
          })
  
         
        ;
      } catch (e) {
        return res.status(500).json({
          error: e.message,
          e
        })
      };

  }
  static async getUser(req,res){
    try{

    const userId = req.user.userId;
    console.log(req)
    const user = await User.model().select('*', 'id=$1', [userId])
    const email = user[0].email;
    const isAdmin= user[0].is_admin
    const token = createToken({ email, isAdmin, userId })
    return res.status(200).json({
      status: "success",
      data: {
        user_id: user[0].id,
        is_admin: user[0].is_admin,
        token,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email
      }
    })
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      e
    })
  }

  }
}



export default User;