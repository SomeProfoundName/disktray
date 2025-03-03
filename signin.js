const accountLink = document.getElementById("account");
const loginForm = document.getElementById("signForm");
const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById("repeat-password-input");
const signup = document.getElementById("signup");
const createAccount = document.getElementById("return-user");
const loginBtn = document.getElementById("loginBtn");
const signingInForm = document.getElementById("signinform");
const showSignInCont = document.getElementById('signinformcont')
const showSignIn = document.getElementById('account')
const signOutBtn = document.getElementById('signOut')
const navUser = document.getElementById('nav-user')


let loggedIn = false;
let returningUser = true

if (!loggedIn) {
    accountLink.innerText = "Sign In";
}





// SIGN IN CHECK
function signInCheck() {
    if (localStorage.getItem('loggedIn')) {
        loggedIn = true
        accountLink.innerText = localStorage.getItem('user')
        navUser.innerText = localStorage.getItem('user')
        signOutBtn.classList.remove('hidden')
        showSignInCont.classList.add('hidden')
    }
}
signInCheck()

// SIGN IN SHOWER
showSignIn.addEventListener('click', (e) => {
    if (!loggedIn) {
        e.preventDefault()
        showSignInCont.style.display = 'block'
        signingInForm.classList.add('dropIn')
    }
})


// SIGN IN FUNCTIONALITY

const errorMsg = document.getElementById("login-responce")

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (returningUser) {
        fetch("http://localhost:3001/", {
            method: "POST",
            body: JSON.stringify({
                "email": emailInput.value,
                "password": passwordInput.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json())
            .then(body => {
                if (body.login == 'successful') {
                    loggedIn = true
                    accountLink.innerText = body.user;
                    showSignInCont.style.display = 'none'
                    localStorage.setItem('user', body.user)
                    localStorage.setItem('loggedIn', 'True')
                    localStorage.setItem('profileImg', body.profileImg)
                    signInCheck()
                }
                if (body.login == 'unsuccessful') {
                    errorMsg.innerText = body.message
                }
            })
    }
    if(!returningUser){
        if(passwordInput.value != repeatPasswordInput.value){
            console.log("password missmatch")
            return "PASSWORDS DO NOT MATCH"
        }
        fetch("http://localhost:3001/user", {
            method: "POST",
            body: JSON.stringify({
                'username': usernameInput.value,
                "email": emailInput.value,
                "password": passwordInput.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.text())
        .then(data => {
            console.log(data)
            if (data === 'Account Created'){
                returningUser = true;
                errorMsg.innerText = 'Please Log In'
                createAccount.innerText = "Create an Account";
                usernameInput.classList.add("hidden");
                repeatPasswordInput.classList.add("hidden");
            }
            if (data === 'Something Went Wrong! Try again Later') {
                errorMsg.innerText = 'Something Went Wrong! Try again Later'
            }
        })
    }
});

// SIGN OUT
signOutBtn.addEventListener('click', (e) => {
    e.preventDefault()
    loggedIn = false
    localStorage.clear()
    location.reload()
})

// RETURN & CREATE ACCOUNT
createAccount.addEventListener("click", (e) => {
    e.preventDefault();
    if (!returningUser) {
        returningUser = true;
        createAccount.innerText = "Create an Account";
        usernameInput.classList.add("hidden");
        repeatPasswordInput.classList.add("hidden");
    } else {
        returningUser = false;
        createAccount.innerText = "Returning User";
        usernameInput.classList.remove("hidden");
        repeatPasswordInput.classList.remove("hidden");
    }
});

