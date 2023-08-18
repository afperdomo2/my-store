const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'franco.gorczany21@ethereal.email',
    pass: '5hZM6vFYGmRZj5P6uP',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Franco Foo 👻" <franco.gorczany21@ethereal.email>', // sender address
    to: 'franco.gorczany21@ethereal.email', // list of receivers
    subject: 'Envío de mensajes de pruebas ✔', // Subject line
    text: 'Texto plano: Hola mundo', // plain text body
    html: '<b>Texto HTML: Hola mundo</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

sendMail();
