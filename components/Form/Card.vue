<script setup lang="ts">
import  CardSchema from '~/schemas/Card.schema';
import type { CardDocument } from '~/server/models/Card.model';



interface Props {
	type: 'create' | 'update',
	initialData?: CardDocument,
	listId: string,
	onCreate?: () => void,
	onUpdate?: () => void
}

const isLoading = ref(false)

const props = withDefaults(defineProps<Props>(), {
	type: "create"
})

const { destroy } = useCard();

const formState = reactive<Partial<CardDocument>>({
	title: undefined,
	description: undefined,
	list: props.listId

});

const handleSubmit =  async (event: FormSubmitEvent<z.output<typeof CardSchema>>) => {

	try{

		isLoading.value = true

		if(props.type === 'update' && props.initialData){

			await useFetch(`/api/lists/${props.listId}/cards/${props.initialData._id}`, {
				method: "PUT",
				body: JSON.stringify(event.data),
				watch: false
			});

			props.onUpdate?.();
			
			return;
		}

		await useFetch(`/api/lists/${props.listId}/cards`, {
			method: "POST",
			body: JSON.stringify(event.data),
			watch: false
		});

		props.onCreate?.();

	} catch(err){

	} finally{
		isloading.value = false
	}

}

const handleDelete = async () => {
	destroy(props.listId, props.initialData?._id)

	props.onUpdate?.()
}

watchEffect(() => {
	if(props.type === 'update' && props.initialData){
		formState.title = props.initialData.title;
		formState.description = props.initialData.description;
	}
});

</script>

<template>
	<UForm :state="formState" :schema="CardSchema"  @submit="handleSubmit">
		<UFormGroup name="title" label="Title" class="mb-4">
			<UInput v-model="formState.title" />
		</UFormGroup>
		<UFormGroup name="description" label="Description" class="mb-4">
			<ClientOnly>
				<QuillEditor v-model:content="formState.description" 
				content-type="html"
				 />
			</ClientOnly>
		</UFormGroup>

		<div class="flex flex-col gap-2">
			<UButton v-if="initialData && type === 'update'" type="button" block variant="soft" color="red" @click="handleDelete">Delete</UButton>

			<UButton type="submit" block :isloading = "isLoading">
			   {{ props.type === "create" ?  "Create": "Update" }}
		    </UButton>
		</div>
	</UForm>
</template>
<style>
	.ql-editor{
		@apply h-32
	}
</style>