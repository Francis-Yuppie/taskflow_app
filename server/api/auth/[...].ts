//@ts-ignore
import { NuxtAuthHandler } from '#auth'
//@ts-ignore
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '~/server/models/User.model'

const getUser = async (id: string) => {
	const user = await User.findById(id)

	return user?.toJSON();
}

export default NuxtAuthHandler({
	secret: useRuntimeConfig().auth.secret,

	pages: {
		signIn: '/auth/signin'
	},

	providers: [

		CredentialsProvider.default({
			name: "credentials",
			origin: useRuntimeConfig().auth.origin,


			async authorize(credentials: {
				email: string,
				password: string
			}){
				const user = await User.findOne({email: credentials.email}).select("+password")

				if(!user){
					return null;
				}

				const isValid = await user.comparePassword(credentials.password)

				if(!isValid){
					return null;
				}

				return user.toObject();
			}
		})

	],

	session: {
		strategy: "jwt"
	},

	callbacks: {
		//@ts-ignore
		async jwt({token, user}){
			if(user){
				token = {
					...token,
					...user
				}
			}

			return token
		},
		//@ts-ignore
		async session({session, token}){
			const refrehedUser = await getUser(token._id)

			session.user = {
				...token,
				...session.user,
				...refrehedUser
			}

			return session
		}
	}
})


