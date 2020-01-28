import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
	placement: {
		type: String,
		required: true
	},
	placementOrder: {
		type: Number,
		required: false
	},
	path: {
		type: String,
		required: true
	},
	caption: {
		type: String,
		required: false
	}
});

export default model('Image', imageSchema);
