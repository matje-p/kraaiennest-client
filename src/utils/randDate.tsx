function randDate() {
  const now = new Date();
  const threeYearsAgo = new Date();
  threeYearsAgo.setMonth(now.getMonth() - 6);

  const randomTime =
    Math.random() * (now.getTime() - threeYearsAgo.getTime()) +
    threeYearsAgo.getTime();

  return new Date(randomTime);
}

export default randDate;
