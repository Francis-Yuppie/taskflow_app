import { Schema, model, Document } from 'mongoose';

export interface CardDocument extends Document {
	title: string,
	description: string,
	owner: string,
	list: string,
	createdAt: Date,
	updatedAt: Date
}

const cardSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	list: {
		type: Schema.Types.ObjectId,
		ref: "List",
		required: true
	}
}, {timeStamps: true})

export const Card = model<CardDocument>('Card', cardSchema)