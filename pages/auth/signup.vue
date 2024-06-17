<script setup lang="ts">
import  SignupSchema from '~/schemas/Signup.schema';	
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import type {z }from 'zod';


useHead({
	title: "Signup"
});


const isLoading = ref(false)


const formState = reactive({
	username: undefined,
	email: undefined,
	password: undefined,
	passwordComfirm: undefined,
});

const handleSubmit = async(event: FormSubmitEvent<z.output<typeof SignupSchema>>) => {
	try {
		isLoading.value = true;event

		await useFetch('/api/auth/signup', {
			method: "POST",
			body: event.data,
			watch: false
		})

		useToast().add({
			title: "Account created",
			description: "Your Account has been created successfully, Redirecting you to the sign in page",
			timeout: 2000
		})

		useRouter().push('/auth/signin');

	} catch(error: any){
		console.error(error)

		useToast().add({
			title: "Account created",
			description: error.message || "Something went wrong"
		})
	} finally {
		isLoading.value = false;

	}
}

</script>
<template>
	 <WrapperAuth title="Create your account">

	 	 <template #subheading>
		  	 <p class="mt-1 ">Already have an account?  <NuxtLink :to="{
		  	 	name: 'auth-signin'
		  	 }" class="text-primary-500">Login </NuxtLink></p>
	    </template>

	 	<UForm :state="formState" :schema="SignupSchema" @submit="handleSubmit">
	 		<UFormGroup class="mb-4" name="username" label="Name">
				<UInput v-model="formState.username" type="text" />
			</UFormGroup>
			<UFormGroup class="mb-4" name="email" label="Email">
				<UInput v-model="formState.email" type="email" />
			</UFormGroup>
			<UFormGroup class="mb-4" name="password" label="Password">
				<UInput v-model="formState.password" type="password" />
			</UFormGroup>
			<UFormGroup class="mb-4" name="passwordComfirm" label="Confirm Password ">
				<UInput v-model="formState.passwordComfirm" type="password" />
			</UFormGroup>

			<UButton :loading="isLoading" type="submit" block >Create account</UButton>
	 	 </UForm>
	 </WrapperAuth>
</template>
<style>
	
</style>