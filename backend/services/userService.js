const postmark = require('postmark');
const uniqid = require('uniqid');
const { update } = require('../models/userModel');
const User = require('../models/userModel');

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

const sendEmailService = async (req, res, user) => {
  try {
    const resetToken = uniqid();

    const email = await client.sendEmail({
      From: 'support@fabienbrocklesby.com',
      To: user.email,
      Subject: 'Reset Your Trickit Password',
      HtmlBody: `Hello ${user.name},<br><br>We've heared you forgot your password!<br />Here's a token to reset it:<br /><br />${resetToken}<br /><br />If you didn't request this, please ignore this email.<br /><br />Cheers,<br />Trickit Team`,
    });

    if (!email) {
      throw new Error('Oops, this is not sending!');
    }
  } catch (Error) {
    res.status(400);
    res.setHeader('content-type', 'text/plain');
    res.end(`${Error.message}`);
  }
};

module.exports = {
  sendEmailService,
};
