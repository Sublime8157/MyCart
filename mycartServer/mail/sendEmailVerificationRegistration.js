const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); 
const { transporter } = require('../mail/transporter'); 


const secret = process.env.JWT_SECRET // this is a key defined by the dev 
async function sendEmail(formData) {  
  try {
    const token = jwt.sign({ email: formData.email }, secret, { expiresIn: '1h' }) // create a token 
  const verificationUrl = `http://localhost:3000/verificationResult?token=${token}`;  // redirect the user to the route for verifyng email
  
  let htmlTemplate = fs.readFileSync(path.join(__dirname, 'template','registration.html'), 'utf8'); // find the email template for registration 
  htmlTemplate = htmlTemplate.replace('{{verificationUrl}}', verificationUrl);   // get the verificationUrl from the email template replace it with the route 
  // send mail with defined transport object 
  await transporter.sendMail({
    from: '"My Cart" <mycart@demomailtrap.com>', // sender address
    to: formData.email, // list of receivers
    subject: "Email Verification", // Subject line
    html: htmlTemplate, // html body
  });
  return true;
  } catch {
    return false;
  }
}

module.exports = { sendEmail }; 