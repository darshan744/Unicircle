import express from 'express';
import envs from './Environments';
const app = express();
app.listen(envs.port, () => console.log(`Listening in ${envs.port}`))