import bcryptjs from 'bcryptjs'
const saltRounds = 8

const hashPassword = password => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    
}
export default hashPassword