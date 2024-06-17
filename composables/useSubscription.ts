
export const useSubscription = () => {

	const isLoading = ref(false);
	const  subscriptionModalState = useState('subscription-modal-state', () => false);

    const modalTitle = useState(() => 'Upgrade to premium');
    const modalDescription = useState(() => 'Create unlimited boards and access all premium features');

    function showSubscriptionModal(options?: {
    	title: string,
    	description: string
    }){

    	if(options?.title){
    		modalTitle.value = options.title;
    	}

    	if(options?.description){
    		modalDescription.value = options.description;
    	}

    	subscriptionModalState.value = true;

    }

    function hideSubscriptionModal(){
    	subscriptionModalState.value = false;
    }

    async function subscribe(){

    	try{

    		isLoading.value = true;

    		const { data, error } =  await useFetch(`/api/users/subscribe`, {
    			method: "POST"
    		});

    		if(data.value){
    			window.location.href = data.value
    		}

    		if(error.value){
    			useToast().add({
    				title: error.value.statusMessage,
    				description: error.value.message,
    				color: "red"
    			})
    		}

    	} catch(err: any){

    		useToast().add({
    				title: "Error",
    				description: err.message || "something went wrong",
    				color: "red"
    			});
    	} finally {
    		isLoading.value = false
    	}

    }

     async function accessPortal(){

    	try{

    		isLoading.value = true;

    		const { data, error } =  await useFetch(`/api/users/access-portal`);

    		if(data.value){
    			window.location.href = data.value
    		}

    		if(error.value){
    			useToast().add({
    				title: error.value.statusMessage,
    				description: error.value.message,
    				color: "red"
    			})
    		}

    	} catch(err: any){

    		useToast().add({
    				title: "Error",
    				description: err.message || "something went wrong",
    				color: "red"
    			});
    	} finally {
    		isLoading.value = false
    	}

    }

    //@ts-expect-error
    watch(subscriptionModalState, (val) => {
    	if(!val){
    		setTimeout(() => {
    			modalTitle.value = "Upgrade To Premium"
    			modalDescription.value = "Create unlimited boards and access all premium features"
    		}, 200)
    	}
    });

	return {
		hideSubscriptionModal,
   		showSubscriptionModal,

   		accessPortal,
   		subscribe,
		isLoading,
		subscriptionModalState,
		modalTitle,
   		modalDescription,
	}
}