import crypto from 'crypto';

// Secret crypto manager where only  the class can handle with Hashing and Verifing the password
const Hash = (password: string) => {
    return new Promise<string>((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex");

        crypto.scrypt(password, salt,64,(err, derivedKey)=> {
            if(err) reject(err);
            resolve(`${salt}:${derivedKey.toString("hex")}`);
        });
    });
}

const Verify = (password: string, hash: string) => {
    return new Promise<boolean>((resolve, reject) => {
        const [salt, key] = hash.split(":");
        crypto.scrypt(password, salt,64,(err, derivedKey) => {
            if(err) reject(err);
            resolve(key == derivedKey.toString("hex"));
        });
    });
}
//#
export {Hash, Verify};