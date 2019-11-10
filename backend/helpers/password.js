import bcrypt from 'bcrypt';

const hashPassword =password => bcrypt.hashSync(password,10)

const decryptPassword =(userPassword, hashPassword) => bcrypt.compareSync(userPassword, hashPassword)

export default {
    hashPassword,
    decryptPassword
}