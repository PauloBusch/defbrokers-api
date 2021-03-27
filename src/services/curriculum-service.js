const { IncomingForm } = require('formidable');
const { Email } = require('../utils/content/validators');
const { MailAttachment, MailDetails, MailSmtp } = require('../utils/mail/mailSmtp');

async function sendCurriculum(req, res) {
  
  new IncomingForm().parse(req, function(err, fields, files) {
    if (err) return res.json({ errors: ['Cannot read parameters'] });
    const errorValidation = validatePost(fields, files);
    if (errorValidation) return res.status(400).json({ errors: [errorValidation] });

    const mailAttachment = new MailAttachment(
      files.curriculum.name,
      files.curriculum
    );

    const mailDetail = new MailDetails(
      `${fields.websiteName} - Currículo`,
      `<h3>Um novo currículo foi enviado pelo website <a href="${fields.websiteUrl}">${fields.websiteName}</a>, o arquivo está anexado ao email.</h3>` + 
      `<h3>Informações do candidato:</h3>` +
      `<strong>Nome: </strong> ${fields.name}<br />` +
      `<strong>Email: </strong> ${fields.email}<br />` +
      `<strong>Mensagem: </strong> ${fields.message}<br />`,
      process.env.SMTP_CONTACT,
      [mailAttachment]
    );

    const mail = new MailSmtp(mailDetail);
    mail.Send((err, info) => {
      if (err) return res.status(400).json({ errors: ['Fail to send email'] });
      res.json({ });
    });
  });
} 

function validatePost(fields, files) {
  if (!fields.websiteName) return 'Parameter websiteName is required';
  if (!fields.websiteUrl) return 'Parameter websiteUrl is required';
  if (!fields.name) return 'Parameter name is required';
  if (!fields.email) return 'Parameter email is required';
  if (!Email.valid(fields.email)) return 'Parameter email is invalid';
  if (!fields.message) return 'Parameter message is required';
  if (!files.curriculum) return 'Curriculum file is required';
  const { name } = files.curriculum;
  const extension = name.substring(name.lastIndexOf('.'));
  if (extension !== '.pdf') return 'Curriculum file only accept .pdf extension';
}

module.exports = { sendCurriculum }
