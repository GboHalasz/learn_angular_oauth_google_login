const myWelcome = {

    show: function (welcomeText, welcomePlace, userName) {
        if (userName) {          

            while (welcomePlace.hasChildNodes()) {
                welcomePlace.removeChild(list.firstChild);
            }

            let textNode = document.createTextNode(`${welcomeText} ${userName}`)            

            let logOutButton = document.createElement("button")
            let buttonText = document.createTextNode("Log out!")
            logOutButton.appendChild(buttonText)
            logOutButton.classList.add("btn", "btn-sm", "btn-secondary", "mx-2")

            welcomePlace.appendChild(textNode);
            welcomePlace.appendChild(logOutButton);
            welcomePlace.classList.remove("d-none");
            welcomePlace.classList.add("d-inline-block");
        }
    }
}