import Stripe from 'stripe';


export default () => {

	const config = useRuntimeConfig();

	if(!config.stripeSecretKey){
		throw createError({
			statusCode: 500,
			message: "Stripe secrete key is required"
		})
	}

	const stripe = new Stripe(config.stripeSecretKey);

	return stripe;
}