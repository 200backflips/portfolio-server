import express from 'express';
import { connect } from './database/mongoose';
import { images } from './api/routes/images';
import { uploads } from './api/routes/uploads';
import cors from 'cors';
import methodOverride from 'method-override';

const app = express();
const port = 8080;
connect;

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/images', images);
app.use('/uploads', uploads);

app.listen(port, () => console.log(`listening on port ${port}`));
