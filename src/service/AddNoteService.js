
export const newNoteToken = (newNote) => sessionStorage.setItem("newNote", newNote);

export const getNewNoteToken = () => sessionStorage.getItem("newNote");