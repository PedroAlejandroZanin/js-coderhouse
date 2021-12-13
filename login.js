const botonsub = document.getElementById("botonsub")



// if () ||
//         (password === localStorage.getItem("password", JSON.parse(password)))


function login() {

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    let jason = localStorage.setItem("email", JSON.stringify(email))
    localStorage.setItem("password", JSON.stringify("password"))

    console.log(jason)

}



// botonsub.addEventListener("click", (e) => {
//     e.preventDefault()

//     let emailJSON = localStorage.getItem("email", JSON.parse(email))
//     let passJSON = localStorage.getItem("password", JSON.parse(password))


//     if ((email == emailJSON) || (password == passJSON)) {
//         alert("hola")
//     } else {
//         alert("quien sos, papa")
//     }


// })