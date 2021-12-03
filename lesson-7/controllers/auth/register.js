const { Conflict } = require('http-errors')
const { User } = require('../../models')

const register = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }
  // Варіант 1:
  const newUser = new User({ name, email })
  newUser.setPassword(password)
  newUser.save()
  // Варіант 2:
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  // const result = await User.create({ name, email, password: hashPassword })
  res.status(201).json({
    status: 'succes',
    code: 201,
    data: {
      user: { email, name },
    },
  })
}

module.exports = register
