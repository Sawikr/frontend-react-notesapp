
export const noteCreatingDateToken = (noteCreatingDate) => localStorage.setItem("noteCreatingDate", noteCreatingDate);

export const getNoteCreatingDateToken = () => localStorage.getItem("noteCreatingDate");
