import { Router } from 'express';
import Image from '../models';
import { getImage } from '../middleware';

export const images = Router();

// get all image objects
images.get('/', async (req, res) => {
	try {
		const images = await Image.find();
		res.json(images);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// get single image object
images.get('/:id', getImage, async (req, res) => {
	res.send(res.image);
});

// post new image object
images.post('/', async (req, res) => {
	const image = new Image({
		placement: req.body.placement,
		placementOrder: req.body.placementOrder,
		path: req.body.path,
		caption: req.body.caption
	});
	try {
		const newImage = await image.save();
		res.status(201).json(newImage);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// update image object
images.patch('/:id', getImage, async (req, res) => {
	Object.keys(req.body).forEach(key => {
		res.image[key] = req.body[key];
	});
	try {
		const updateImage = await res.image.save();
		res.json(updateImage);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// delete image object
images.delete('/:id', getImage, async (req, res) => {
	try {
		await res.image.remove();
		res.json({ message: 'image deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
