
const jwt = require('jsonwebtoken');
const User = require('../../schemas/user');
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

module.exports = { forgotPassword }
