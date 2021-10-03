exports.getRandomCode = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return randomString;
};
