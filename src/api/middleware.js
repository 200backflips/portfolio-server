import Image from './models';

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