import { UserDocument } from '~/server/models/User.model'
import { Card } from '~/server/models/Card.model'
import { List } from '~/server/models/List.model'

//@ts-ignore
export default defineEventHandler(async (event) => {

	const listId = getRouterParam(event, "listId");
	const user = event.context.user as UserDocument;


	const list = await List.findOne({
		_id: listId,
		owner: user._id
	}).populate({
		path: "cards",
		model: Card
	});

	if(!list){
		throw createError({
			status: 404,
			message: "List not found"
		});
		
	}

	return list.cards
})