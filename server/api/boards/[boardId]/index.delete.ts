import { Card } from '~/server/models/Card.model'
import { List } from '~/server/models/List.model'
import { UserDocument } from '~/server/models/User.model'
import { Board } from '~/server/models/Board.model'


//@ts-ignore
export default defineEventHandler(async (event) => {

	const boardId = getRouterParam(event, "boardId");
	const user = event.context.user as UserDocument;

	const board = await Board.findOneAndDelete({
		_id: boardId,
		owner: user._id
	});

	if(!board){
		throw createError({
			status: 404,
			message: "Board not found"
		});
		
	}

	await List.deleteMany({
		board: board._id,
		owner: user._id
	});

	event.node.res.statusCode = 204
	 
	return true
})