import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
import express, {Express} from 'express';
import "reflect-metadata";
import {graphqlHTTP} from 'express-graphql';
import {AppDataSource} from "./data-source";
import {checkPermission} from "./utils/checkPermission";
import {
    root,
    schema
} from "./GraphQl/schema";
const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    if ('OPTIONS' == req.method) return res.sendStatus(204);
    next();
});
app.use(express.json())
app.use('/server',checkPermission,graphqlHTTP({
    schema,
    rootValue: root
}));
app.use('',(req, res) => {
    res.status(404).send("page not found");
});
app.listen(PORT, async () => {
    await AppDataSource.initialize();
    console.log(`listening on port ${PORT}`)
})
