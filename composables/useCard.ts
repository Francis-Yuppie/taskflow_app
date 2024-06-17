import  type { CardDocument } from '~/server/models/List.model'

export const useCard = () => {

	async function destroy(listId: string, cardId: string){
		try{

			await useFetch(`/api/lists/${listId}/cards/${cardId}`, {
				method: "DELETE",

			})

			useToast().add({
				title: "Card deleted"
			})

		} catch(err: any){
			useToast().add({
				title: "Error",
				description: err.message || "Something went wrong"
			})
		}
	}

	async function update(cardId: string, listId: string, data: Partial<CardDocument>){
		try{

			await useFetch(`/api/lists/${listId}/cards/${cardId}`, {
				method: "PUT",
				body: data,
				watch: false
			})
		} catch(err: any){
			useToast().add({
				title: "Error",
				description: err.message || "Something went wrong"
			})
		}
	}
	return {
		update,
		destroy
	}
}