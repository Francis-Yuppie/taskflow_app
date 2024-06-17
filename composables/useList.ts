import  type { ListDocument } from '~/server/models/List.model'

export const useList = (boardId: string) => {


	async function handleSort(event: any, lists: ListDocumen[]){

		await useFetch(`/api/boards/${boardId}`, {
			method: 'PUT',
			body: {
				lists: lists.flatMap(item => item._id)
			},
			watch: false
		});
	}

	async function destroy(listId: string){
		try{

			await useFetch(`/api/lists/${listId}`, {
				method: "DELETE",

			})

			useToast().add({
				title: "List deleted"
			})

		} catch(err: any){
			useToast().add({
				title: "Error",
				description: err.message || "Something went wrong"
			})
		}
	}

	async function update(listId: string, data: Partial<ListDocument>){
		try{

			await useFetch(`/api/lists/${listId}`, {
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
  	handleSort,
  	destroy,
  	update
  }

}