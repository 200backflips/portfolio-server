import express from 'express';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import { router } from './api/routes/routes';
import { uploads } from './api/routes/uploads';
import cors from 'cors';

const app = express();
const port = 8080;
config();

connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('we connecteeed!'))
	.catch(err => console.error(err.message));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public'));
app.use('/images', router);
app.use('/uploads', uploads);

app.listen(port, () => console.log(`listening on port ${port}`));
