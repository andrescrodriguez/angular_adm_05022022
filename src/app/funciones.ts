import * as Crypto from 'crypto-js';

export function toBase64(file: File){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// export function encriptarAES(value: string, key: string) {
//     return Crypto.AES.encrypt(value, key);
// }

// export function desencriptarAES(value: string, key: string) {
//     return Crypto.AES.decrypt(value, key);
// }

// export function encriptarSHA256(value: string, key: string) {
//     return Crypto.SHA256.encrypt(value, key);
// }




 const key = Crypto.enc.Utf8.parse ("1234123412ABCDEF"); // número hexadecimal de 16 dígitos como clave
 const iv = Crypto.enc.Utf8.parse ('ABCDEF1234123412'); // Número hexadecimal como desplazamiento de clave

 // Método de descifrado
 export function desencriptarAES(value) {
    let encryptedHexStr = Crypto.enc.Hex.parse(value);
    let srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
    let decrypt = Crypto.AES.decrypt(srcs, key, { iv: iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(Crypto.enc.Utf8);
    return decryptedStr.toString();
}

 // Método de cifrado
 export function encriptarAES(value) {
    let srcs = Crypto.enc.Utf8.parse(value);
    let encrypted = Crypto.AES.encrypt(srcs, key, { iv: iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
