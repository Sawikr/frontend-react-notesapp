
export const navbarToken = (navbar) => sessionStorage.setItem("navbar", navbar);

export const getNavbarToken = () => sessionStorage.getItem("navbar");