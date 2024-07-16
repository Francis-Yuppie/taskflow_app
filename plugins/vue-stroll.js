import VueStroll from 'vue-stroll';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component("VueStroll", VueStroll);
})