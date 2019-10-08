import bcryptjs from 'bcryptjs'

const hashPassword = password => {
        const salt = await bcryptjs.genSalt(10);
        const hashed = await bcryptjs.hash(password, salt);
        return hashed;
    
}
export default hashPassword