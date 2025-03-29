// LOGIN AND REGISTER
function getFormValues(ids) {
    return ids.reduce((values, id) => {
        const el = document.getElementById(id);
        if (el) values[id] = el.value.trim();
        return values;
    }, {});
}

function saveUserToLocalStorage(username, userData) {
    localStorage.setItem(username, JSON.stringify(userData));
}

function getUserFromLocalStorage(username) {
    return JSON.parse(localStorage.getItem(username));
}

function handleFormSubmit(formId, callback) {
    document.getElementById(formId)?.addEventListener('submit', function (e) {
        e.preventDefault();
        callback();
    });
}

handleFormSubmit('register', () => {
    const { "input-username": username, "input-email": email, "input-password-register": password } =
        getFormValues(['input-username', 'input-email', 'input-password-register']);

    saveUserToLocalStorage(username, { username, email, password });
    alert('Registered successfully!');
    window.location.href = 'login.html';
});

handleFormSubmit('login', () => {
    const { "input-username": username, "input-password-login": password } =
        getFormValues(['input-username', 'input-password-login']);

    const storedUser = getUserFromLocalStorage(username);
    if (storedUser?.password === password) {
        window.location.href = 'index.html';
    } else {
        alert('Incorrect username or password!');
    }
});