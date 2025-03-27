// PASSWORD MATCHING
function checkPasswordMatch() {
    const password = document.getElementById('input-password-register');
    const confirmPassword = document.getElementById('confirm-password');
    const message = document.getElementById('message');

    if (!password || !confirmPassword || !message) return;

    const passwordsMatch = password.value === confirmPassword.value;
    const isEmpty = password.value === '' || confirmPassword.value === '';

    if (isEmpty) {
        message.textContent = '';
    } else {
        message.style.color = passwordsMatch ? '#4a73e8' : 'red';
        message.textContent = passwordsMatch ? 'MATCHED' : 'NOT MATCHING';
    }
}

['input-password-register', 'confirm-password'].forEach((id) => {
    document.getElementById(id)?.addEventListener('keyup', checkPasswordMatch);
});

// PASSWORD VISIBILITY TOGGLE
function togglePasswordVisibility(passwordInputId, toggleEyeId) {
    const passwordInput = document.getElementById(passwordInputId);
    const toggleEye = document.getElementById(toggleEyeId);

    if (!passwordInput || !toggleEye) return;

    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleEye.textContent = isPassword ? '-_-' : 'o-o';
}

if (document.getElementById('toggleEye')) {
    document.getElementById('toggleEye').addEventListener('click', function () {
        togglePasswordVisibility('input-password-login', 'toggleEye');
        togglePasswordVisibility('input-password-register', 'toggleEye');
    });
}