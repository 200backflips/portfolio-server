import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import { randomBytes } from 'crypto';
import { extname } from 'path';

const storage = new GridFsStorage({
	url: process.env.DATABASE_URL,
	options: { useUnifiedTopology: true },
	file: (req, file) => {
		console.log(file.originalname)
      return {
				filename: file.originalname,
        bucketName: 'uploads'
    }
  }
});

export const upload = multer({ storage }).single('file');
