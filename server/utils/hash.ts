import bcrypt from 'bcryptjs';


export const generateHash = async (data:string) => {
	const salt = await bcrypt.genSalt(10)

	const hashedData = await bcrypt.hash(data, salt)

	return hashedData
}