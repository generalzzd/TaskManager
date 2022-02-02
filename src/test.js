const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(hashedPassword)


    const isMatch = await bcrypt.compare('Red12345!', 
    '$2a$08$M9cgDPQlW6TSdYLlG9rY6O5/orwJ5.PAeyNtczZ4siTqE3eFBaYui')
    console.log(isMatch)
}

myFunction()