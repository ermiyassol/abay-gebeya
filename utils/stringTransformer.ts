export const changeEmailToName = (email: string) => {
  return email
    .split("@")[0]
    .split(".")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
};
