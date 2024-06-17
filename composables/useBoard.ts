// import  type { ListDocument } from '~/server/models/List.model'

export const useBoard = () => {

	async function destroy(boardId: string){
		try{

			await useFetch(`/api/boards/${boardId}`, {
				method: "DELETE",
			})

			useToast().add({
				title: "Board deleted"
			})

		} catch(err: any){
			useToast().add({
				title: "Error",
				description: err.message || "Something went wrong"
			})
		}
	}

  return {
  	destroy,
  }

}