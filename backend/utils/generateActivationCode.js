import crypto from "crypto";

const generateActivationCode = () => {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
};

export default generateActivationCode;
