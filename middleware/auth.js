const { User } = require('../models')
const bcrypt = require('bcrypt')

async function auth(req, res, next){
    const { email, password } = req.headers
    
    if(!email || !password){
        return res.status(401).json({
            message: 'Email and Password are required'
        })
    }

    try{
        const user = await User.findOne( {where: {email}})

        if(!user || !bcrypt.compare(password, user.password)){
            return res.status(401).json({
                message: 'Invalid Credential'
            }) 
        }

        req.user = user
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = auth