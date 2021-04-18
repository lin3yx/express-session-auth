import crypto from "crypto";

const validatePassword = (password, hash, salt) => {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVerify;
};

const generatePassword = (password) => {
  let salt = crypto.randomBytes(32).toString("hex");
  let hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: hash,
  };
};

export { validatePassword, generatePassword };
