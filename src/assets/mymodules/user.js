
const userData = () => {
    const user = {
        name: ""
    }

    const setNameFromSessionStorage = () => {
       console.log(JSON.parse(sessionStorage.getItem("user")))
        user.name = JSON.parse(sessionStorage.getItem("user")) ? JSON.parse(sessionStorage.getItem("user")).name : "";
    }

    return { setUserNameFromSessionStorage: setNameFromSessionStorage, user }
}