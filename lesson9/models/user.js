const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
)
// додаток до Варіанту 1 в controllers / register newUser (наступні 2 строки):
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// додаток до Варіанту 1 в controllers / login login(password) (наступні 2 строки):
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
}
