// HOLDING CODE THAT IM NOW USING RN

login.addEventListener('submit', (e) => {
    let error = []

    if (returningUser) {
        signingIn = logIn(emailInput.value, passwordInput.value)
    }

    if(!returningUser) {
        error = getCreateAccountErrors(usernameInput.value, emailInput.value, passwordInput.value, repeatPasswordInput.value)
    } else {
        error = getLoginErrors(emailInput.value, passwordInput.value)
    }
    

})


if (email === user.account.email && password === user.account.password) {
    loggedIn = true
    accountLink = user.username
    console.log('success')
}