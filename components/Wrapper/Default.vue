<script setup lang="ts">
import type { UserDocument } from '~/server/models/User.model';


const { data, signOut} = useAuth();

const handleSignOut = async() => {
	await signOut()
}

const { showSubscriptionModal, accessPortal } = useSubscription();

const dropDownItems = ref([
	[
		{
			label: "Profile",
			slot: "profile",
			disabled: true,
		}
	],
	[
		{
			label: "Billing",
			icon: "i-heroicons-credit-card",
			click: accessPortal,
		}
	],
	[
		{
			label: "Sign out",
			icon: "i-heroicons-arrow-left-on-rectangle",
			click:  handleSignOut,
		}
	]
]);


</script>
<template>
	<div>
		<header class="p-2 border-b dark:border-gray-700 bg-purple-400 dark:bg-gray-800 sticky top-0 z-[100]">
			<UContainer>
				<div class="flex justify-between">
					<NuxtLink to="/">
						<div class="inline-flex items-center gap-2">
							<IconsLogo class="text-teal-900 font-extrabold text-4xl" />
							<h1 class="font-extrabold font-mono">TaskFlow</h1>
						</div>
					</NuxtLink>
					<div class="inline-flex justify-end gap-4 items-center">
						<slot name="actions"></slot>

						<UIcon v-if="!(data?.user as UserDocument).hasActiveSubscription"
							name="i-heroicons-star" 
							class="w-6 h-6 font-bold text-2xl text-amber-500 cursor-pointer"
							@click="showSubscriptionModal"
						/>

						<ColorSwitcher />
						<UDropdown :items="dropDownItems">
							<UIcon name="i-heroicons-user-circle" class="w-6 h-6 font-bold text-2xl" />

							<template #profile>
								<div class="text-left z-[1]">
									<p class="font-bold text-sm text-cyan-500">Signed in as</p>
									<p class="truncate font-medium text-slate-900 dark:text-white">
										{{ data?.user?.email }}
									</p>
								</div>
							</template>
						</UDropdown>
					</div>
				</div>
			</UContainer>
		</header>


		<main class="my-4">
			<UContainer >
				<slot />
			</UContainer>
		</main>
	</div>
</template>
<style>
	/*
	bg-slate-950
	bg-indigo-700
	 */
</style>