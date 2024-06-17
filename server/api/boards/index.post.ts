import { Validator } from "#nuxt-server-utils"
import  BoardSchema from '~/schemas/Board.schema'
// import { User } from '~/server/models/User.model'
import { Board } from '~/server/models/Board.model'
import type { UserDocument } from '~/server/models/User.model'


///@ts-ignore
export default defineEventHandler(async (event) => {

	const user = event.context.user as UserDocument;

	const body = await readBody(event);

	Validator.validateSchema(BoardSchema, body);

	const boardCount = await Board.countDocuments({ owner: user._id });

	if(boardCount >= 1 && !user.hasActiveSubscription){

		throw createError({
			statusCode: 403,
			message: "You cant create more than 1 board in free plan, Please upgrade your plan to create Unlimited"
		})
	}

	const board = await Board.create({
		...body,
		owner: user._id
	})

	return board
})