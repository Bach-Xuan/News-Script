// PASSWORD MATCHING
function checkPasswordMatch() {
    const password = document.getElementById('input-password-register');
    const confirmPassword = document.getElementById('confirm-password');
    const message = document.getElementById('message');

    if (!password || !confirmPassword || !message) return;

    const passwordsMatch = password.value === confirmPassword.value;
    message.textContent = password.value && confirmPassword.value
        ? passwordsMatch ? 'MATCHED' : 'NOT MATCHING'
        : '';
    message.style.color = passwordsMatch ? '#4a73e8' : 'red';
}

document.addEventListener('keyup', (e) => {
    if (['input-password-register', 'confirm-password'].includes(e.target.id)) {
        checkPasswordMatch();
    }
});

// PASSWORD VISIBILITY TOGGLE
function togglePasswordVisibility(passwordInput, toggleEye) {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleEye.textContent = isPassword ? '-_-' : 'o-o';
}

document.getElementById('toggleEye')?.addEventListener('click', () => {
    ['input-password-login', 'input-password-register'].forEach((id) => {
        const passwordInput = document.getElementById(id);
        const toggleEye = document.getElementById('toggleEye');
        if (passwordInput && toggleEye) togglePasswordVisibility(passwordInput, toggleEye);
    });
});