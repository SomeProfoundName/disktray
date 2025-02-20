// TESTING SIGN IN WITH LOCAL ACCOUNTS
// import { accounts } from './accounts.js'
// console.log(accounts)

const accountLink = document.getElementById("account");
const login = document.getElementById("signForm");
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

if (!loggedIn) {
    accountLink.innerText = "Sign In";
} 

// TESTING AREA - SQL INTERGRATION

// const testing = document.getElementById('test_btn')
// testing.addEventListener('click', backendTest)

// function backendTest() {
//     fetch("http://localhost:8080/")
//     .then(response => {
//         console.log(response.json())
//     })
// }

// PRE SIGN IN CHECK

function signInCheck() {
    if(localStorage.getItem('loggedIn')) {
        loggedIn = true
        accountLink.innerText = localStorage.getItem('username')
        navUser.innerText = localStorage.getItem('username')
        signOutBtn.classList.remove('hidden')
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

signOutBtn.addEventListener('click', (e) => {
    e.preventDefault()
    loggedIn = false
    localStorage.clear()
    location.reload()
})

let returningUser = true;

//RESPONCE IF ERROR
const errorMsg = document.getElementById("login-responce");

// LOGIN
login.addEventListener("submit", (e) => {
    e.preventDefault();

    if (returningUser) {
        console.log(emailInput.value, passwordInput.value);
        logIn(emailInput.value, passwordInput.value);
    } 
    signInCheck()
});

function logIn(email, password) {
    let success = false
    accounts.forEach((user) => {
        if (email === user.email && password === user.password) {
            console.log("success");
            success = true
            loggedIn = true;
            accountLink.innerText = user.username;
            showSignInCont.style.display = 'none'
            localStorage.setItem('username', user.username)
            localStorage.setItem('loggedIn', 'True')
        } 
    })
    if (success == false) {
        console.log('nope')
        errorMsg.innerText = "Either Username or Password Inccorect";
    };
}

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
