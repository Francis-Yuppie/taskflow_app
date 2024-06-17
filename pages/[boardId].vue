<script setup lang="ts">
import type { ListDocument } from '~/server/models/List.model'
import type { BaordDocument } from '~/server/models/Baord.model'

definePageMeta({
	middleware: 'auth'
});

const { boardId } = useRoute().params


const { data,refresh } = await useFetch<BaordDocument>(`/api/boards/${boardId}`);

if(!data.value){
	throw createError({
		statusCode: 404,
		message: "Board not found"
	})
}

useHead({
	title: data.value.name,
	titleTemplate: "%s - Boards"
})

provide("board-refresh", refresh)

const selectedList = ref<ListDocument | undefined>();
const showListCreate = ref(false);

</script>


<template>
	<WrapperDefault v-if="data"
		class="h-screen w-full h-full"
		:style="{
			backgroundImage: `url(${data.coverImage})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundAttachment: 'fixed'
		}"

	>
		<template #actions>
			<UButton size="xs" label="Create List" 
			      class="font-semibold dark:text-white"
			      @click="showListCreate = true"
			/>
		</template>

		<h1 class="text-3xl font-semibold mb-4 inline-block">{{ data.name }}</h1>

		<!-- list container -->
			<ListContainer :lists="data.lists" :board-id="boardId" />
		<!-- list container -->

		 <USlideover v-model="showListCreate">
		 	<OverlayHeader :title="selectedList ? 'Update list' : 'Create list'"
		 		:on-click="() => showListCreate = false"
		 	 >
		 	</OverlayHeader>
		 	<div class="p-4">
		 		<FormList :type="selectedList ? 'update' : 'create'"
		 		  :initial-data="selectedList" :board-id="(boardId as string)" 
		 		  :on-create="() => {
		 		  	refresh()
		 		  	showListCreate = false
		 		   }" />
		 	</div>
		 </USlideover>
	</WrapperDefault>
</template>
<style>
	
</style>