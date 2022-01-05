const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { sendEmail } = require('../../helpers')
const { nanoid } = require('nanoid')
const { User } = require('../../models')

const register = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }
  // Варіант 1:
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()
  const newUser = new User({ name, email, avatarURL, verificationToken })
  newUser.setPassword(password)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Подтверждение email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  }
  // Варіант 2:
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  // const result = await User.create({ name, email, password: hashPassword })
  await sendEmail(mail)

  res.status(201).json({
    status: 'succes',
    code: 201,
    data: {
      user: { email, name, avatarURL, verificationToken },
    },
  })
}

module.exports = register
