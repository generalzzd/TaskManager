const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(hashedPassword)


    const isMatch = await bcrypt.compare('zhangzidi', 
    '$2a$08$ejmxlpuzbwtyp4jlj7c9yongr.j6avdyxbfelxapmh0wrcg4j6ijk')
    console.log(isMatch)
}

myFunction()