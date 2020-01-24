import express from 'express';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import { router } from './api/routes';
const app = express();
const port = 8080;
config();

connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('we connecteeed!'))
	.catch(err => console.error(err.message));

// app.use('/images', express.static('images'));
app.use(express.json());
app.use('/images', router);


app.listen(port, () => console.log(`listening on port ${port}`));
