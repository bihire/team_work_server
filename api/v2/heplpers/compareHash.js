import bcryptjs from 'bcryptjs'

const comparePassword = ({ value, User }) => {

    const hashedPassword = new Promise((resolve, reject) => {
        bcryptjs.compare(value.password, User.password, (err, hash) => {
            if (err) reject(err)
            if (hash) {
                resolve(true)
            } else {
                resolve(false)
            }

        });
    })
    return hashedPassword
}


export default comparePassword