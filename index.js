let loggedIn = false
const accountLink = document.getElementById('account')

if (!loggedIn) {
    accountLink.innerText = 'Sign In'
} 

const account = [{
    username: 'Collins',
    account: {
        email: 'collinscomondi@gmail.com',
        password: 'password'
    }
}]

// FORM 
const login = document.getElementById('signForm')
const usernameInput = document.getElementById('username-input') 
const emailInput = document.getElementById('email-input') 
const passwordInput = document.getElementById('password-input') 
const repeatPasswordInput = document.getElementById('repeat-password-input') 
const signup = document.getElementById('signup')
const createAccount = document.getElementById('return-user')
const loginBtn = document.getElementById('loginBtn')

let returningUser = true

//RESPONCE IF ERROR
const errorMsg = document.getElementById('login-responce')

// LOGIN

login.addEventListener('submit', (e) => {
    e.preventDefault()

    if(returningUser) {
        console.log(emailInput.value, passwordInput.value)
        signingIn = logIn(emailInput.value, passwordInput.value)
    } else {
        
    }
})

function logIn(email, password) {
    account.forEach((user) => {
        if (email === user.account.email && password === user.account.password) {
            console.log('success')
            loggedIn = true
            accountLink.innerText = user.username
        } else {
            console.log('nope')
            errorMsg.innerText = 'Either Username or Password Inccorect'
        }
    })
}


createAccount.addEventListener('click', (e) => {
    e.preventDefault()
    if (!returningUser) {
        returningUser = true
        createAccount.innerText = 'Create an Account'
        usernameInput.classList.add('hidden')
        repeatPasswordInput.classList.add('hidden')
    } else {
        returningUser = false
        createAccount.innerText = 'Returning User'
        usernameInput.classList.remove('hidden')
        repeatPasswordInput.classList.remove('hidden')
    }
})




