import { User } from '~/server/models/User.model';
import stripe from '~/server/utils/stripe';

//@ts-ignore
export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig();

  const user = await User.findById(event.context.user._id);

  if (!user) {
    throw createError({
      status: 401,
      message: "Unauthorized request"
    });
  }
  if (!user.stripeCustomerId) {

    const customer = await stripe().customers.create({
      email: user.email,
      name: user.name
    });

    user.stripeCustomerId = customer.id;

    await user.save();
  }

  // checkout sessions
  const session = await stripe().checkout.sessions.create({
    customer: user.stripeCustomerId,
    line_items: [
      {
        price: config.public.stripePriceId,
        quantity: 1
      }
    ],
    mode: "subscription",
    success_url: config.auth.origin,
    cancel_url: config.auth.origin
  });

  if (!session || !session.url) {
    throw createError({
      statusCode: 400,
      message: "Something went wrong"
    });
  }

  return session.url;
});
