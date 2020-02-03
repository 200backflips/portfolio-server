import { connect, connection, mongo } from 'mongoose';
import Grid from 'gridfs-stream'
import { config } from 'dotenv';

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
		console.log('we opeeeen!');
		gfs = new Grid(connection.db, mongo)
		gfs.collection('uploads');
	})
	.catch(err => console.error(err.message));
