const ip = 'localhost';
const port = 8082;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
  ip,
  port,
  isProduction,
  isDevelopment,
}
