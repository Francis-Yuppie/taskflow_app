<script setup lang="ts">
import  SigninSchema from '~/schemas/Signin.schema';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import type {z }from 'zod'


useHead({
	title: "Login"
});

const isLoading = ref(false)

const formState = reactive({
	email: undefined,
	password: undefined,
});

const { signIn } = useAuth();

const handleSignin = async (event: FormSubmitEvent<z.output<typeof SigninSchema>>) => {

	try{
		isLoading.value = true

		const res = await signIn('credentials', {
			email: event.data.email,
			password: event.data.password,
			redirect: false
		})

		if(!res.error){
			useRouter().push('/')
		}

	} catch(error){
		console.error(error)
	} finally{
		isLoading.value = false
	}
}
</script>

<template>
	 <WrapperAuth title="Login to your account">

	  <template #subheading>
	  	 <p class="mt-1 ">Dont have an account?  <NuxtLink :to="{
	  	 	name: 'auth-signup'
	  	 }" class="text-primary-500">Signup Now</NuxtLink></p>

	  	 <p class="mt-1 ">Forgot Password?  <NuxtLink :to="{
	  	 	name: 'auth-signup'
	  	 }" class="text-primary-500">Reset</NuxtLink></p>
	  	 
	  </template>

	 	<UForm :state="formState" :schema="SigninSchema" @submit="handleSignin">
 				<UFormGroup class="mb-4" name="email" label="Email">
 					<UInput v-model="formState.email" type="email" />
 				</UFormGroup>
 				<UFormGroup class="mb-4" name="password" label="Password">
 					<UInput v-model="formState.password" type="password" />
 				</UFormGroup>

 				<UButton :loading="isLoading" type="submit" block >Signin</UButton>
	 	 </UForm>
	 </WrapperAuth>
</template>
 <style>
	
</style>