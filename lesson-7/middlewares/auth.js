/* Извлекает токен из заголовка и:
1) провиряет валидность токена (то есть что ми его видали и он не истек)
2)извлекает из токена id, находит пользователя в базе по id и проверяет его к запросу (req.user)
*/
/*
1.Извлечь из заголовка запроса  содержимое заголовка Authorization
2.Разделить его на 2 слова: Bearer и токен
3. Проверить ли первое слово 'Bearer'
4. Проверить валидность втогрого слова (токена)
5. Если токен валиден - извлечь из него id и найти пользователя в базе
6. Если пользоватнлья с таким id ми нашли в базе - его нужно прикрепить к запросу (обьект req.)
*/
const { Unautorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')
  try {
    if (bearer !== 'Bearer') {
      throw new Unautorized('Not authorized')
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.token) {
      throw new Unautorized('Not authorized')
    }
    req.user = user
    next()
  } catch (error) {
    if (error.message === 'Invalid sugnature') {
      error.status = 401
    }
    next(error)
  }
}

module.exports = auth
