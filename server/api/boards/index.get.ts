import { Board } from '~/server/models/Board.model'


//@ts-ignore
export default defineEventHandler(async(event) => {

	const user = event.context.user;

	const boards = Board.find({
		owner: user._id
	})

	return boards;
})