import CryptoJS from "crypto-js";
import { encKey, encIv } from "./constants";
export default function encrypt(data:string):string {
  let key = CryptoJS.enc.Latin1.parse(encKey);
  let iv = CryptoJS.enc.Latin1.parse(encIv);
  let encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return encrypted?.toString();
}
