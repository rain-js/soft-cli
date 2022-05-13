const ora = require('ora')

const wrapFetchAddLoding = (fn, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start(); // 开始loading
  const r = await fn(...args);
  spinner.succeed(); // 结束loading
  // console.log('r', r)
  return r;
};

module.exports = wrapFetchAddLoding