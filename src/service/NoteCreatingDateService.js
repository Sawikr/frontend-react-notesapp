
export const noteCreatingDateToken = (noteCreatingDate) => localStorage.setItem("noteCreatingDate", noteCreatingDate);

export const getNoteCreatingDateToken = () => localStorage.getItem("noteCreatingDate");

export const noteCreatingDateClickToken = (noteCreatingDateClick) => localStorage.setItem("noteCreatingDateClick", noteCreatingDateClick);

export const getNoteCreatingDateClickToken = () => localStorage.getItem("noteCreatingDateClick");
