export const objectToString = (obj: any) => {
  if(!obj) { return ""; }
  var str = Object.keys(obj)
    .filter((key) => obj[key] !== "" && obj[key] != null)
    .map(function (key) {
      return key + "=" + obj[key];
    })
    .join("&");

  return str;
};
