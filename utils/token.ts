export function token(name:string, pass:string):string {
  const username = name;
  const password = pass;
  const tokenData = `${username}:${password}`;
  const encodedToken = Buffer.from(tokenData).toString("base64");

  return encodedToken;
}
