import CryptoJS from "crypto-js";
import { encKey, encIv } from "./constants";
export default function decrypt(data: string): string {
  let key = CryptoJS.enc.Latin1.parse(encKey);
  let iv = CryptoJS.enc.Latin1.parse(encIv);
  let decrypted = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return decrypted?.toString(CryptoJS.enc.Utf8);
}
