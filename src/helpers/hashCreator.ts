import { rejects } from 'assert';
import crypto from 'crypto';
import { resolve } from 'path';

const hashPassword = async (password: string) => {
    return new Promise((resolve, rejects) => {
        const salt = crypto.randomBytes(16).toString("hex");

        crypto.scrypt(password, salt,64,(err, derivedKey)=> {
            if(err) rejects(err);
            resolve(`${salt}:${derivedKey.toString("hex")}`)
        });
    });
}

const verify = async (password: string, hash: string) => {
    return new Promise((resolve, rejects) => {
        const [salt, key] = hash.split(":");
        crypto.scrypt(password, salt,64,(err, derivedKey) => {
            if(err) rejects(err);
            resolve(key === derivedKey.toString("hex"));
        });
    });
}

export { hashPassword, verify }