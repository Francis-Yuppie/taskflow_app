//@ts-ignore
import { getServerSession } from "#auth";


//@ts-ignore
export default defineEventHandler(async (event) => {
	
	const session = await getServerSession(event);
	
	const protectedRoutes = ['/api/users', '/api/boards', '/api/lists'];

	const isprotectedRoute = protectedRoutes.some((route) => getRequestURL(event).pathname.startsWith(route))

	if(!isprotectedRoute){
		return;
	}

	if(!session){
		throw createError({
			statusCode: 401,
			statusMessage: 'Not Authenticated',
			message: 'You must be logged in to access this resource'
		});
	}

	event.context.user = session.user
})