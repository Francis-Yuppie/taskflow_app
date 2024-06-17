//@ts-ignore
import { z } from 'zod';
import SigninSchema from './Signin.schema'


export default SigninSchema.extend({
	username: z.string(3).min().max(50),
	passwordComfirm: z.string().min(8),

}).refine(data => data.password === data.passwordComfirm, {
	message: 'Password Do not match',
	path: ['passwordComfirm']
})
