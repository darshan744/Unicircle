import dotenv from 'dotenv'
dotenv.config({ path: ".env" })
const envs = {
  port: process.env.PORT || 8080,
  secretKey: process.env.SECRET_KEY || "secret Key",
  refreshKey: process.env.REFRESH_KEY || "refresh Key",
};
export default envs;