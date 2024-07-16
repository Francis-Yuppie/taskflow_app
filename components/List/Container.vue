<script setup lang="ts">
import draggable from 'vuedraggable'
import VueStroll from 'vue-stroll'

interface Props{
	lists: ListDocument[],
	boardId: string
}

const props = defineProps<Props>()



const { handleSort } = useList(props.boardId);

</script>

<template>
	<div>
		<draggable
		 :list="lists" 
		 handle=".list-handle"
		 :scroll-sensitivity="500"
		 :force-fallback="true" item-key="_id"
		 ghost-class="ghost-board"  drag-class="dragging-board"
		 class="flex gap-4 h-[75vh] overflow-x-auto pb-2"
		 @sort="handleSort($event, lists)"
		 >

			<template #item="{ element }">

				<div class="flex">
					<ListItem :list="element" :board-id="boardId" />
				</div>

			</template>

		</draggable>
	</div>
</template>
<style>
	.ghost-board > div{
		@apply opacity-50;
	}
	.ghost-board > div > div{
		@apply invisible;
	}
	.dragging-board {
		@apply shadow-2xl transform rotate-2 cursor-grabbing;
	}
	.sortable-chosen {
		opacity: 1 !important
	}
</style>