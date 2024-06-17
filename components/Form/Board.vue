<script  setup lang="ts">
import type { BoardDocument } from '~/server/models/Board.model';
import  BoardSchema from '~/schemas/Board.schema';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import type {z }from 'zod'
	
interface Props {
	type: 'create' | 'update',
	initialData?: BoardDocument,
	onCreate?: () => void,
	onUpdate?: () => void
}
const props = withDefaults(defineProps<Props>(), {
	type: "create"
})

const isLoading = ref(false)

const formState = reactive<Partial<BoardDocument>>({
	name: undefined,
	coverImage: undefined
});

//@ts-ignore
watchEffect(() => {
	if(props.type === 'update' && props.initialData){
		formState.name = props.initialData.name;
		formState.coverImage = props.initialData.coverImage
	}

	if(props.type === 'create'){
		formState.name = undefined;
		formState.coverImage = undefined;
	}
})


const handleForm = async (event: FormSubmitEvent<z.output<typeof BoardSchema>>) => {
	try{
		isLoading.value = true

		if(props.type === 'update' && props.initialData?._id){
			//@ts-ignore
			await useFetch(`/api/boards/${props.initialData._id}`, {
				method: "PUT",
				body: event.data,
				watch: false
			})
		 	props.onUpdate?.();

		 	useToast().add({
		 		title: "Board Update"
		 	})

		 	return;
		}

		//@ts-ignore
		const { error } = await useFetch('/api/boards', {
			method: "POST",
			body: event.data,
			watch: false
		})
		props.onCreate?.();

		if(error.value){
			useToast().add({
				color: "red",
		 		description: error.value.data.message
		    });

		    if(error.value.statusCode === 403){
		    	useSubscription().showSubscriptionModal({
		    		title: "Multiple Boards is a premium feature",
		    		description: "Please subscribe to create multiple boards"
		    	})
		    }

		    return;
		}

		useToast().add({
		 		title: "Board Created"
		})
	} catch(err){

	} finally {
		isLoading.value = false
	}
}


</script>
<template>
	<UForm :state="formState" :schema="BoardSchema" @submit="handleForm">
		<UFormGroup class="mb-4" name="name" label="Name">
			<UInput v-model="formState.name"></UInput>
		</UFormGroup>
		<UFormGroup class="mb-4" name="coverImage" label="Cover Image">
			<ImagePicker v-model="formState.coverImage" />
		</UFormGroup>

		<UButton block type="submit" :loading="isLoading">
			{{ props.type === 'create' ? 'Create Board' : 'Update Board'}}
		</UButton>
	</UForm>
</template>
<style></style>