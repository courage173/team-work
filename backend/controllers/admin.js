import { createToken,verifyToken } from '../helpers/token';
import Model from '../models/db'


import pass from '../helpers/password';
import { sign } from 'crypto';

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
          status: 'error',
          message: 'invalid email or password'
        });
      } catch (e) {
        return res.status(500).json({
          error: 'server error',
          e
        });
      }
    }
}



export default User;