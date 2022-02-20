export const SecretKey = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log(JWT_SECRET);
  return JWT_SECRET;
};
