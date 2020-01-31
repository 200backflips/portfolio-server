import { Router } from 'express';
import { gfs, upload } from '../../database/mongoose';
import { getFile } from '../middleware';

export const uploads = Router();

// get all uploaded files
uploads.get('/', (req, res) => {
	try {
		gfs.files.find().toArray((err, files) => {
			if (!files || files.length === 0) {
				return res.status(404).json({
					err: 'no files exist'
				});
			}
			return res.json(files);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// get single file
uploads.get('/:filename', (req, res) => {
	try {
		gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
			if (!file || file.length === 0) {
				return res.status(404).json({
					err: 'no file exists'
				});
			}
			return res.json(file);
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// display file
uploads.get('/display/:filename', (req, res) => {
	try {
		gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
			if (!file || file.length === 0) {
				return res.status(404).json({
					err: 'no file exists'
				});
			}
			const readstream = gfs.createReadStream(file.filename);
			readstream.pipe(res);
		});
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
