const crypto = require("crypto");

module.exports.generatePasswordHash = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  //return object containing the generated hash and salt
  return {
    salt: salt,
    hash: hash,
  };
};

module.exports.validatePassword = (password, hash, salt) => {
  const newhash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  //check if the newhash is the same as the existing hash
  return newhash === hash;
};


//generate a random verification code
module.exports.generateVerificationCode = (codeLength = 900000) =>
{
    const date = new Date()
    return {
        code:Math.floor(Math.random() * codeLength) + 100000,
        createdAt:date.toISOString(Date.now())
    }
}
