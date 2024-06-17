<script setup lang="ts">
	
import type { BoardDocument } from '~/server/models/Board.model';

definePageMeta({
	middleware: "auth"
});

useHead({
	title: "Boards"
})

const { data, refresh } = useFetch<BoardDocument[]>('/api/boards');

provide('refresh-boards', refresh);

const showCreateBoard = ref(false);

const selectedBoard = ref<BoardDocument | undefined>();

//@ts-ignore
watchEffect(() => {
	if(!showCreateBoard.value){
		 selectedBoard.value = undefined
	}
})

</script>
<template>
	<WrapperDefault>
		<template #actions>
			<UButton 
		 			size="xs" font="bold" label="Create Board" 
		 			:ui="{ rounded: 'rounded-full' }" 
		 			@click="showCreateBoard = true"
		 			class="bg-cyan-300 font-bold"
		 		/>
		</template>
		 <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-2">

		 	<BoardCard v-for="board in data" :key="board._id" :board="board" :onEdit="() => {
		 		selectedBoard = board;
		 	    showCreateBoard = true;
		 	}" />
		 	
		</div>

		<USlideover v-model="showCreateBoard">
			<OverlayHeader :title="selectedBoard ? 'Update Board' : 'Create Board'"
		 		:on-click="() => showCreateBoard = false" />

		 	<div class="p-4">
		 	  <FormBoard :type="selectedBoard ? 'update' : 'create'"
		 		:initial-data="selectedBoard"
		 		:on-create="() => {
		 			refresh();
		 			showCreateBoard = false
		 		}" 
		 		:on-update ="() => {
		 			refresh();
		 			showCreateBoard = false
		 			selectedBoard  = undefined
		 		}"
		 		/>
		 	</div>

		</USlideover>
	</WrapperDefault>
</template>