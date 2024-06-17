<script  setup lang="ts">
import type { ListDocument } from '~/server/models/List.model';
import  ListSchema from '~/schemas/List.schema';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import type {z }from 'zod'
	
interface Props {
	type: 'create' | 'update',
	initialData?: ListDocument,
	boardId: string,
	onCreate?: () => void,
	onUpdate?: () => void
}
const props = withDefaults(defineProps<Props>(), {
	type: "create"
})

const isLoading = ref(false)

const formState = reactive<Partial<ListDocument>>({
	name: undefined,
	board: props.boardId
});

//@ts-ignore
watchEffect(() => {
	if(props.type === 'update' && props.initialData){
		formState.name = props.initialData.name;
		formState.board = props.initialData.board
	}
})


const handleForm = async (event: FormSubmitEvent<z.output<typeof ListSchema>>) => {
	try{
		isLoading.value = true

		if(props.type === 'update' && props.initialData?._id){
			//@ts-ignore
			await useFetch(`/api/lists/${props.initialData._id}`, {
				method: "PUT",
				body: event.data,
				watch: false
			})
		 	props.onUpdate?.();

		 	useToast().add({
		 		title: "List Update"
		 	})

		 	return;
		}

		//@ts-ignore
		await useFetch('/api/lists', {
			method: "POST",
			body: event.data,
			watch: false
		})
		props.onCreate?.();

		useToast().add({
		 		title: "List Created"
		})
	} catch(err){

	} finally {
		isLoading.value = false
	}
}


</script>
<template>
	<UForm :state="formState" :schema="ListSchema" @submit="handleForm">
		<UFormGroup class="mb-4" name="name" label="Name">
			<UInput v-model="formState.name"></UInput>
		</UFormGroup>
		 
		<UButton block type="submit" :loading="isLoading">
			{{ props.type === 'create' ? 'Create List' : 'Update List'}}
		</UButton>
	</UForm>
</template>
<style></style>