module.exports = (req, res, next) => {
  req.session.recent = res.recent;
  req.session.verificationCode = res.verificationCode;
  if(req.session.isVerified)
  {
    //redirect to get the user if you're session is already verified
    res.redirect("/api/user/")
  }
  else
  {
    //generate verification code if you're session isn't
    res.redirect("/api/code/");
  }
};
