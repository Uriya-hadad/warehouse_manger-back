import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
import express, {Express} from 'express';
import "reflect-metadata";
import {graphqlHTTP} from 'express-graphql';
import {AppDataSource} from "./data-source";
import {checkPermission} from "./utils/checkPermission";
import cors from 'cors';
import {
    root,
    schema
} from "./GraphQl/schema";

const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use(cors({
    origin: ["https://warehouse-staff.herokuapp.com","http://localhost:3000"]
}))
app.use(express.json())
app.use('/server',checkPermission,graphqlHTTP({
    schema,
    rootValue: root
}));
app.use('',(req, res,) => {
    res.status(404).send("page not found");
});
app.listen(PORT, async () => {
    await AppDataSource.initialize();
    console.log(`listening on port ${PORT}`)
})