import { Router } from 'express';
import { assets, deleteAsset } from '../../../fileSystem';

export const uploads = Router();

// get all uploaded images
uploads.get('/', (req, res) => {
	try {
		res.json(assets);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// delete uploaded image
uploads.delete('/', (req, res) => {
	try {
		deleteAsset(req.body.filename);
		res.json({ message: 'image deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});