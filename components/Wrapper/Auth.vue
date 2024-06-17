<script setup lang="ts">

 interface Props{
 	title: string
 }

 defineProps<Props>()

</script>

<template>
	 <div class="grid lg:grid-cols-2 h-screen">
	 	
	 	<div class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52">
	 		<div class="header text-center mb-6">
	 			<h1 class="text-xl font-bold">TaskFlow</h1>
	 			<div class="flex justify-center">
	 				<IconsLogo class="text-teal-900 font-bold text-7xl" />

	 			</div>
	 			<h1 class="text-xl font-bold mt-4">{{ title }}</h1>

	 			<slot name="subheading" />
	 		</div>
	 		<UCard class="mt-8">
	 			<slot />
	 		</UCard>
	 	</div>

	 	<div class="right hidden lg:block"></div>
	 </div>
</template>

<style>
	.right{
		background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
		/*background: linear-gradient(-45deg, cyan, royalblue);*/
		background-size: 400% 400%; 
		animation: gradient 15s ease infinite;
	}

	@keyframes gradient{
		0%{
			background-position: 0% 50%;
		}
		50%{
			background-position: 100% 50%;
		}
		50%{
			background-position: 0% 50%;
		}
	}
</style>