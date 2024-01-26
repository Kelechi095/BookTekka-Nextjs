import { useLibraryStore } from '../zustand/store'

const useNewBook = () => {
  const newBook = useLibraryStore((state: any) => state.newBook)
  const handleSetNewBook = useLibraryStore((state: any) => state.handleSetNewBook)
  

  return {newBook, handleSetNewBook}
}

export default useNewBook