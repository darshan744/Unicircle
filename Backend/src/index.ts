import app from './app'
import envs from "./Environments";

app.use((req , _ , next)=> {
    console.log(`Endpoint : ${req.url} , Method : ${req.method}`);
    next();
})



app.listen(envs.port, () => console.log(`Listening in ${envs.port}`))