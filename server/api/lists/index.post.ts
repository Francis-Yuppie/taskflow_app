import { Validator } from "#nuxt-server-utils"
import { Board } from '~/server/models/Board.model'
import ListSchema from '~/schemas/List.schema';
import { List } from '~/server/models/List.model'


export default defineEventHandler(async (event) => {


	const body = await readBody(event)

	Validator.validateSchema(ListSchema, body)

	const user = event.context.user

	const list = await List.create({
		...body,
		owner: user._id
	})

	if(!list){
		throw createError({
			statusCode: 400,
			message: "Something went wrong"
		});
		
	}

	await Board.findOneAndUpdate(
		{
			_id: body.board,
			owner: user._id,
		}, 
		{
			$push: {lists: list._id}
		}, 
		{
			new: true
		}
	);


	return list

})