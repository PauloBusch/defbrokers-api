const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../schemas/user');
const { Password } = require('../../utils/content/validators');

const sendErrorsFromDB = (res, dbErrors) => {
  const errors = []
  _.forIn(dbErrors.errors, error => errors.push(error.message))
  return res.status(400).json({errors})
}

const login = async (req, res, next) => {
  const failLimit = 3;
  const email = req.body.email || '';
  const password = req.body.password || '';
  User.findOne({ email }, async (err, user) => {
    if(err) {
      return sendErrorsFromDB(res, err);
    } else if (user && user.loginFailCount > failLimit) {
      return res.status(400).send({errors: ['O Usuário está bloqueado por tentativas falhas de login']});
    } else if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user: { _id: user._id, name: user.name, email: user.email } }, process.env.SECRET, { expiresIn: "1h" });
      const { name, email } = user;
      return res.json({ name, email, token });
    } else {
      if (user) {
        const failCount = (user.loginFailCount || 0) + 1;
        await User.updateOne({ email }, { loginFailCount: failCount });
        if (failCount > failLimit)
          return res.status(400).send({errors: ['O Usuário foi bloqueado por tentativas falhas de login']});
      }
      return res.status(400).send({errors: ['Usuário/Senha inválidos']});
    }
  });
}

const validateToken = (req, res, next) => {
  const token = req.body.token || '';
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    return res.status(200).send({valid: !err});
  });
}

const changePassword = async (req, res) => {
  const data = req.body;
  const validationResult = validateChangePassword(data);
  if (validationResult) return res.status(400).json({ errors: [validationResult] });

  const { email } = req.user;
  const user = await User.findOne({ email });
  if (!bcrypt.compareSync(data.oldPassword, user.password))
    return res.status(400).json({ invalidPassword: true, errors: ['oldPassword is invalid'] });
 
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(data.newPassword, salt); 
  await User.updateOne({ email }, { password: hash });
  return res.json({  });
}

function validateChangePassword(data) {
  if (!data.oldPassword) return 'Parameter oldPassword is required';
  if (!data.newPassword) return 'Parameter newPassword is required';
  if (data.newPassword && !Password.valid(data.newPassword)) return 'Parameter newPassword is not strong';
  if (!data.confirmPassword) return 'Parameter confirmPassword is required';
  if (data.newPassword !== data.confirmPassword) return 'Parameter confirmPassword is not equal newPassword';
}

module.exports = { login, validateToken, changePassword }
