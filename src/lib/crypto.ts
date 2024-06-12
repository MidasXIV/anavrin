import crypto from "crypto";

const algorithm = "aes-256-cbc";

const encrypt = (text: string): string => {
  // protected data
  const message = text;
  // the cipher function
  const cipher = crypto.createCipheriv(
    algorithm,
    process.env.ENCRYPTION_SECURITY_KEY,
    process.env.ENCRYPTION_VECTOR_KEY
  );

  // encrypt the message
  // input encoding
  // output encoding
  let encryptedData = cipher.update(message, "utf-8", "hex");

  encryptedData += cipher.final("hex");
  return encryptedData;
};

const decrypt = (encryptedData: string): string => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.ENCRYPTION_SECURITY_KEY,
    process.env.ENCRYPTION_VECTOR_KEY
  );
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};

export { encrypt, decrypt };
