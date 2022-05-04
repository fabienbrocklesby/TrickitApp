const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ tlds: { allow: false } }),
  currentEmail: Joi.string().email({ tlds: { allow: false } }),
  newEmail: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(5).max(20).regex(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/),
  trick: Joi.string().min(3).max(70),
  songName: Joi.string().min(3).max(70),
  songUrl: Joi.string().min(3).max(200),
  resetToken: Joi.string().min(3).max(30),
});

exports.validateData = (req, res, next) => {
  const {
    error,
  } = schema.validate(req.body);
  if (error) {
    res.status(422)
      .send(error.details[0].message);
  } else {
    next();
  }
};
