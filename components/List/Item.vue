<script setup lang="ts">
import  type { ListDocument } from '~/server/models/List.model';
import  type { CardDocument } from '~/server/models/Card.model';
import vuedraggable from 'vuedraggable'


interface Props{
	list: ListDocument,
	boardId: string
}

const refreshBoard = inject("board-refresh") as () => void;

	
const props = defineProps<Props>();



const listActions = ref([
	[
		{
			label: 'Add Card',
			icon: 'i-heroicons-plus-circle',
			click: () => {
				showCardCreate.value = true
			}
		}
	],
	[
		{
			label: 'Delete',
			icon: 'i-heroicons-trash',
			click: () => {
				destroy(props.list._id);
				refreshBoard()
			}
		}
	]
]);


const { destroy, update: updateList } = useList(props.boardId);
const { update: updateCard } = useCard();

const { data, refresh } = useFetch<CardDocument[]>(`/api/lists/${props.list._id}/cards`)

const showCardCreate = ref(false);
const selectedCard = ref<CardDocument | undefined>();


const handleCardUpdate = (card: CardDocument) => {
	selectedCard.value = card;
	showCardCreate.value = true;
}


const handleCardChange = async (event: any) => {

	try{

		if(event.added){
			const { element: card } = event.added;

			await updateCard(card._id, props.list._id, {
				list: props.list._id
			});
		}

		await updateList(props.list._id, {
				cards: data.value?.flatMap(item => item._id)
			});

	} catch(error){

	}
}

watch(showCardCreate, (val) => {
	if(!val){
		selectedCard.value = undefined;
	}
})

</script>

<template>
	<div class="w-72 shadow bg-gray-100 flex-none dark:bg-slate-950 rounded-lg border-slate-700 flex flex-col">

						<!-- header -->
						<div class="p-2 border-b dark:border-slate-700  flex items-center justify-between list-handle">
							<h3 class="capitalize font-semibold">{{ list.name }}</h3>

							<UDropdown :items=" listActions">
								<UIcon name="i-heroicons-ellipsis-vertical" class="font-extrabold text-xl">
								</UIcon>
							</UDropdown>
						</div>
						<!-- header -->



						<!-- List Body -->
							<vuedraggable 
								v-if="data" 
								:list="data" 
								item-key="_id"
								group="list"
								ghost-class="card-ghost"
								:scroll-sensitivity="500"
								:force-fallback="true"
								class="p-2 space-y-2 flex-1 overflow-y-hidden"
								@change="handleCardChange"
								>

								<template #item="{ element }">
									<div>
										<ListCard :card="element" 
										@click="() => handleCardUpdate(element)" />
									</div>
								</template>
							</vuedraggable>
						<!-- List Body -->

						<!-- Footer -->
						<div class="p-1 border-t dark:border-slate-700 flex items-center">
							<UButton block label="Add Card" @click="showCardCreate = true"/>
						</div>
						<!-- Footer -->

						<Teleport to="body">
							<UModal v-model="showCardCreate">

									<OverlayHeader :title="selectedCard ? 'Update Card' : 'Create Card'"
										:on-click="() => (showCardCreate = false)"
									 ></OverlayHeader>


								<div class="p-2">
									<FormCard 
									    :type="selectedCard ? 'update':'create'"
										:list-id="props.list._id" :initial-data="selectedCard"
										:on-create="() => {
											refresh(),
											showCardCreate = false
										}"
										:on-update="() => {
											refresh(),
											showCardCreate = false
											selectedCard = undefined
										}"
									/>								 
								</div>

							</UModal>

						</Teleport>

					</div>
</template>

<style>
	.card-ghost {
		@apply !bg-gray-100 dark:!bg-gray-700 rounded-lg;
	}
	.card-ghost > div {
		@apply invisible;
	}
</style>