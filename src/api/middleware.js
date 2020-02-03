import Image from './models';
import { gfs } from '../database/mongoose';

export const getImage = async (req, res, next) => {
	let image;
	try {
		image = await Image.findById(req.params.id);
		if (image == null) {
			return res.status(404).json({ message: 'cannot find image' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.image = image;
	next();
};

export const getAllFiles = (req, res, next) => {
	gfs.files.find().toArray((err, result) => {
		if (!result || result.length === 0) {
			return res.status(404).json({
				error: 'no files exist'
			});
		}
		res.result = result;
		next();
	});
};

export const getFile = (req, res, next) => {
	gfs.files.findOne({ filename: req.params.filename }, (err, result) => {
		if (!result || result.length === 0) {
			return res.status(404).json({
				error: 'no file exists'
			});
		}
		res.result = result;
		next();
	});
};
