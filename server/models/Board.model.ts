import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';
import { ListDocument } from './List.model'



export interface BoardDocument extends Document{
	name: String,
	lists: String[] | ListDocument[],
	owner: String,
	coverImage: String,
}

const boardSchema = new Schema({
	name:{
		type: String,
		default: "Untitled Board"
	},
	lists: [
		{
			type: Schema.Types.ObjectId,
			ref: "List",
		},
	],
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	coverImage: {
		type: String,
		default: null
	}
}, 
	{ timeStamps: true}
);

 export const Board = model<BoardDocument>('Board', boardSchema);