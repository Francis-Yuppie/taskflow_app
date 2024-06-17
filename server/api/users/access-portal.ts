import  type { UserDocument } from '~/server/models/User.model'

//@ts-expect-error
export default defineEventHandler(async (event) => {

	const user = event.context.user as UserDocument;

	if(!user.stripeCustomerId){
		throw createError({
			status: 400,
			message: "You have not subscribe to any service"
		});
	}

	const session = await stripe().billingPortal.sessions.create({
		customer: user.stripeCustomerId,
		return_url: useRuntimeConfig().auth.origin
	})

	return session?.url;
})