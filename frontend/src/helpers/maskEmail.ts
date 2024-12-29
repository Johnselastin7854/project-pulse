export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart = `${localPart.slice(0, 3)}*****${localPart.slice(-2)}`;
  return `${maskedLocalPart}@${domain}`;
};
