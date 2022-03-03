import bcrypt from 'bcryptjs'

const users=[
    {
        name:'prince patel',
        email:'prince@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'yagnesh patel',
        email:'yagnesh@gmail.com',
        password:bcrypt.hashSync('123456',10)
    },
    {
        name:'sagar patel',
        email:'sagar@gmail.com',
        password:bcrypt.hashSync('123456',10)
    }
]


export default users