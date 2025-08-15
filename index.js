import express from 'express';
import env from 'dotenv';
import userRouter from "./routes/user.routes.js";
import { authenticationMiddleware } from './middlewares/auth.middleware.js'
import urlRouter from './routes/url.routes.js'



env.config();
const port =  3000;
const app = express();


app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
   return res.status(200).json({ message: 'Hello World!' });
});





app.use('/user', userRouter);
app.use(urlRouter);


app.listen(port,  () => {
  console.log(`Server running at http://localhost:${port}`);
});