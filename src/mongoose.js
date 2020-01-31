import { connect, connection, mongo } from 'mongoose';
import { config } from 'dotenv';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import GridFsStorage from 'multer-gridfs-storage';
import multer from 'multer';
import Grid from 'gridfs-stream';

config();
export let gfs;

export default connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

connection
	.on('open', () => console.log('we connecteeed!'))
	.catch(err => console.error(err.message));

connection
	.once('open', () => {
		console.log('we opeeeen!')
		gfs = Grid(connection.db, mongo);
		gfs.collection('uploads');
	})
	.catch(err => console.error(err.message));

const storage = new GridFsStorage({
	url: process.env.DATABASE_URL,
	options: { useUnifiedTopology: true },
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads'
				};
				resolve(fileInfo);
			});
		});
	}
});

export const upload = multer({ storage }).single('file');
