import { createToken } from '../helpers/token';
import Model from '../models/db'


import pass from '../helpers/password';

class User {
  static model() {
    return new Model('users');
  }



  static async signUp(req, res) {
    try {
        const {
          email, first_name, last_name,is_admin
        } = req.body;
  
        let { password } = req.body;
        const token = createToken({
          email, first_name, last_name,is_admin
        });
        password = pass.hashPassword(password);
        const rows = await User.model().insert(
          'email, first_name, last_name, password, is_admin',
          `'${email}', '${first_name}', '${last_name}', '${password}', ${is_admin}`
        );
  
        return res.status(201).json({
          status: 'success',
          data: {
            id: rows[0].id,
            is_admin: rows[0].is_admin,
            token,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            email: rows[0].email
          }
        });
      } catch (e) {
        return res.status(500).json({
          error: e.message,
          e
        });
      }
    }
     }


export default User;