
const jwt = require('jsonwebtoken');
const User = require('../../schemas/user');
const bcrypt = require('bcrypt');
const { Password } = require('../../utils/content/validators');
const { MailDetails, MailSmtp } = require('../../utils/mail/mailSmtp');

async function forgotPassword(req, res) {
  const { email, baseUrl } = req.body;
  if (!baseUrl) return res.status(400).json({ errors: ['Parameter baseUrl is required!'] });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ errors: ['User with email is not found!'] });
  const token = jwt.sign(
    { user: { email: user.email } }, 
    process.env.SECRET, 
    { expiresIn: "1h" }
  );
  const mailDetail = new MailDetails(
    `Redefinição de Senha`,
    `<p><a href="${baseUrl}?token=${token}">Link</a> para redefinir sua senha.</p>`,
    email
  );

  const mail = new MailSmtp(mailDetail);
  mail.Send((err, info) => {
    if (err) return res.status(400).json({ errors: ['Fail to send email'] });
    res.json({ });
  });
}

async function changePasswordWithToken(req, res) {
  const data = req.body;
  const validationResult = validateChangePassword(data);
  if (validationResult) return res.status(400).json({ errors: [validationResult] });
  jwt.verify(data.token, process.env.SECRET, async function(err, decoded) {
    if(err) {
      return res.status(403).send({ errors: ['Token is invalid'] });
    }
    if (!decoded || !decoded.user) 
      return res.status(403).send({ errors: ['Token no has email provied'] });
    const { email } = decoded.user;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(data.newPassword, salt); 
    await User.updateOne({ email }, { password: hash, loginFailCount: 0 });
    return res.json({  });
  });
}

function validateChangePassword(data) {
  if (!data.token) return 'Parameter token is required';
  if (!data.newPassword) return 'Parameter newPassword is required';
  if (data.newPassword && !Password.valid(data.newPassword)) return 'Parameter newPassword is not strong';
  if (!data.confirmPassword) return 'Parameter confirmPassword is required';
  if (data.newPassword !== data.confirmPassword) return 'Parameter confirmPassword is not equal newPassword';
}

module.exports = { forgotPassword, changePasswordWithToken }
