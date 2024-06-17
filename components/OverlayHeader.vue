<script setup lang="ts">
	
defineProps<{
	title: string,
	onClick: () => void;
}>();

</script>
<template>
	<div class="py-2 px-4 flex justify-between items-center border-b dark: border-gray-800">
		<h3 class="font-semibold"> {{ title }}</h3>
		<UButton
		    color="gray"
			variant="ghost"
			@click="onClick"
		 >
		 	<IconsClose class="text-lime-400 dark:text-white font-bold text-2xl" />
		 </UButton>
			
	</div>
</template>