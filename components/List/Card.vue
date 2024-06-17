<script setup lang="ts">
import  type { CardDocument } from '~/server/models/Card.model';	

defineProps<{
	card: CardDocument;
}>();

</script>

<template>
	<div class="p-2 border shadow  rounded-lg dark:border-gray-600 text-sm cursor-grab font-semibold dark:bg-gray-700 bg-white">
		{{ card.title }}
	</div>
</template>