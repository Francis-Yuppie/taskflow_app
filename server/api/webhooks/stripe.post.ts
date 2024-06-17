import { User } from '~/server/models/User.model';
import Stripe from 'stripe';

 

export default defineEventHandler(async (event) => {

	const config = useRuntimeConfig();
	const body = await readRawBody(event);

	const stripeSignature = getHeader(event, "stripe-signature");

	if(!body || !stripeSignature){
		throw createError({
			statusCode: 400,
			message: "Invalid Data"
		})
	}


	try {

		const stripeEvent = stripe().webhooks.constructEvent(body, stripeSignature,
		 config.stripeWebHookSecret);

		switch(stripeEvent.type){
			case "customer.subscription.created":
			case "customer.subscription.deleted":
			case "customer.subscription.paused":
			case "customer.subscription.resumed":
			case "customer.subscription.updated": {

				const data = stripeEvent.data.object as Stripe.Subscription;
				const user = await User.findOne({stripeCustomerId: data.customer});

				await user?.updateSubscription(data);
			}

		}

		return 'Ok';

	} catch(err){
		throw createError({
			statusCode: 400,
			message: "Invalid request body"
		});
		
	}
})