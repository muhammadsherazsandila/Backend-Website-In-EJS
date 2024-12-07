const profilePicForm = document.getElementById("profilePicForm");
const profilePic = document.getElementById("profilePic");
const uploadButton = document.getElementById("uploadButton");
const crossButton = document.getElementById("crossButton");
profilePic.addEventListener("click", () => {
    profilePicForm.style.top = '0';
})
uploadButton.addEventListener("click", () => {
    profilePicForm.style.top = '-15%';
})
crossButton.addEventListener("click", () => {
    profilePicForm.style.top = '-15%';
})