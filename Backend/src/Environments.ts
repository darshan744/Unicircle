import dotenv from 'dotenv'
dotenv.config({path:".env"})
const envs = {
  port: process.env.PORT,
};
export default envs;