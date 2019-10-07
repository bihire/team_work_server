import bcryptjs from 'bcryptjs'
const saltRounds = 8

const hashPassword = password => {

    const hashedPassword = new Promise((resolve, reject) => {
        bcryptjs.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword
}
export default hashPassword