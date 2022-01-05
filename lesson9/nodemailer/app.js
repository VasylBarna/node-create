const nodemailre = require('nodemailer')
require('dotenv').config()

const { META_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: 'gomate@meta.ua',
    pass: META_PASSWORD,
  },
}

const transporter = nodemailre.createTransport(nodemailerConfig)

const email = {
  to: 'vasylbarna@gmail.com',
  from: 'gomate@meta.ua',
  subject: 'New application from the site',
  html: '<p>A new application came from the site</p>',
}

transporter
  .sendMail(email)
  .then(() => console.log('Email send success'))
  .catch((error) => console.log(error.message))
