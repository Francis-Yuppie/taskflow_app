import { Validator } from "#nuxt-server-utils"
import  BoardSchema from '~/schemas/Board.schema'
// import { User } from '~/server/models/User.model'
import { Board } from '~/server/models/Board.model'

///@ts-ignore
export default defineEventHandler(async (event) => {

	const user = event.context.user;

	const body = await readBody(event);

	Validator.validateSchema(BoardSchema.partial(), body);
	
	const boardId = getRouterParam(event, 'boardId')

	const board = await Board.findOneAndUpdate({
		_id: boardId,
		owner: user._id,
	}, {
		$set: body
	})

	return board
})