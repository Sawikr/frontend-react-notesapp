
export const saveCategory = (category) => sessionStorage.setItem("category", category);

export const getCategory = () => {
    let category;
    return category = sessionStorage.getItem("category");
}