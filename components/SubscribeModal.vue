<script setup lang="ts">


const {

	subscriptionModalState,
	hideSubscriptionModal,
   	showSubscriptionModal,
	modalTitle,
	modalDescription,
	isLoading,
	subscribe

 } = useSubscription();

</script>

<template>
	<div>
		<UModal v-model="subscriptionModalState">
			<div class="p-8 text-center">
				<h1 class="text-2xl font-medium">
					{{ modalTitle }}
				</h1>
				<p class="mt-4 text-gray-500 dark:text-gray-300">
					{{ modalDescription }}
				</p>
				<img src="/img/board.svg" class="w-10/12 mx-auto block my-8" />
				<UButton class="mt-4" block :loading="isLoading"
					@click="subscribe"
				>Subscribe for $2.90/m</UButton> 
			</div>
		</UModal>
	</div>
</template>
<style>
	
</style>