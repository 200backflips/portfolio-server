import { Router } from 'express';
import { gfs } from '../../database/mongoose';
import { upload } from '../../database/gridfs';
import { getFile, getAllFiles } from '../middleware';

export const uploads = Router();

// get all uploaded files
uploads.get('/', getAllFiles, (req, res) => {
	try {
		res.json(res.result);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// get single file
uploads.get('/:filename', getFile, (req, res) => {
	try {
		return res.json(res.result);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// display single file
uploads.get('/display/:filename', getFile, (req, res) => {
	try {
		const readstream = gfs.createReadStream(res.result);
		return readstream.pipe(res);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// upload file
uploads.post('/', upload, (req, res) => {
	try {
		res.status(201).json('file uploaded');
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// delete file
uploads.delete('/:id', (req, res) => {
	try {
		gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, file) => {
			if (err) {
				return res.status(404).json({ error: err });
			}
			return res.status(200).json('file deleted');
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
