export const erroMessage = {
    saveErrorMessage: (message) => {
        localStorage.setItem("errorMessage", message);
    },
    getErrorMessage: () => {
        return localStorage.getItem("errorMessage");
    },
    clearErrorMessage: () => {
        localStorage.removeItem("errorMessage");
    },
}