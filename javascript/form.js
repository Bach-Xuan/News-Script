// HIỂN THỊ MẬT KHẨU 
function togglePasswordVisibility(passwordInputId, toggleEyeId) {
    // Get the password input element by its ID
    let passwordInput = document.getElementById(passwordInputId);
    console.log(passwordInput);
    // Get the toggle eye span element by its ID
    let toggleEye = document.getElementById(toggleEyeId);

    // Toggle the visibility of the password
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleEye.textContent = '-_-'; // Optionally change the icon/text to indicate password is visible
    } else {
        passwordInput.type = 'password';
        toggleEye.textContent = 'o-o'; // Optionally change the icon/text to indicate password is hidden
    }
}

// LOGIN
if (document.getElementById('toggleEye-login')) {
    document.getElementById('toggleEye-login').addEventListener('click', function () {
        togglePasswordVisibility('input-password-login', 'toggleEye-login');
    });
}

// REGISTER
if (document.getElementById('toggleEye-register')) {
    document.getElementById('toggleEye-register').addEventListener('click', function () {
        togglePasswordVisibility('input-password-register', 'toggleEye-register');
    });
}


// ĐẢM BẢO INPUT PHẢI CÓ GIÁ TRỊ TRƯỚC KHI SUBMIT (LOGIN)
function submitAndRedirectLogin(event) { // CHẶN VIỆC MẶC ĐỊNH GỬI BIỂU MẪU
    event.preventDefault();

    const form = document.getElementById('login');

    // KIỂM TRA XEM FORM CÓ GIÁ TRỊ INPUT CHƯA
    if (form.checkValidity()) {
        form.submit();
        alert('WELCOME BACK!'); // THÔNG BÁO ĐĂNG NHẬP THÀNH CÔNG
        window.location.href = 'index.html';
    } else { // HIỂN THỊ THÔNG BÁO XÁC THỰC CHO CÁC TRƯỜNG HỢP KHÔNG HỢP LỆ
        form.reportValidity();
    }
}

// ĐẢM BẢO INPUT PHẢI CÓ GIÁ TRỊ TRƯỚC KHI SUBMIT (REGISTER P1)
function submitAndRedirectRegisterP1(event) {  // CHẶN VIỆC MẶC ĐỊNH GỬI BIỂU MẪU
    event.preventDefault();

    const form = document.getElementById('registerP1');

    // KIỂM TRA XEM FORM CÓ GIÁ TRỊ INPUT CHƯA
    if (form.checkValidity()) {
        form.submit();
        window.location.href = 'registerP2.html';
    } else { // HIỂN THỊ THÔNG BÁO XÁC THỰC CHO CÁC TRƯỜNG HỢP KHÔNG HỢP LỆ
        form.reportValidity();
    }
}

// ĐẢM BẢO INPUT PHẢI CÓ GIÁ TRỊ TRƯỚC KHI SUBMIT (REGISTER P2)
function submitAndRedirectRegisterP2(event) {  // CHẶN VIỆC MẶC ĐỊNH GỬI BIỂU MẪU
    event.preventDefault();

    const form = document.getElementById('registerP2');

    // KIỂM TRA XEM FORM CÓ GIÁ TRỊ INPUT CHƯA
    if (form.checkValidity()) {
        form.submit();
        alert('ACCOUNT CREATED!'); // THÔNG BÁO ĐĂNG KÝ THÀNH CÔNG
        window.location.href = 'login.html';
    } else { // HIỂN THỊ THÔNG BÁO XÁC THỰC CHO CÁC TRƯỜNG HỢP KHÔNG HỢP LỆ
        form.reportValidity();
    }
}

// ĐẢM BẢO INPUT PHẢI CÓ GIÁ TRỊ TRƯỚC KHI SUBMIT (POSTING)
function submitAndRedirectPosting(event) {  // CHẶN VIỆC MẶC ĐỊNH GỬI BIỂU MẪU
    event.preventDefault();

    const form = document.getElementById('posting');

    // KIỂM TRA XEM FORM CÓ GIÁ TRỊ INPUT CHƯA
    if (form.checkValidity()) {
        form.submit();
        alert('ARTICLE POSTED');
        window.location.href = 'index.html';
    } else { // HIỂN THỊ THÔNG BÁO XÁC THỰC CHO CÁC TRƯỜNG HỢP KHÔNG HỢP LỆ
        form.reportValidity();
    }
}

// XEM XÉT SỰ TƯƠNG ĐỒNG KHI LẶP LẠI PASSWORD ĐỐI VỚI PASSWORD GỐC
var check = function () {
    if ( // NẾU HAI INPUT CÓ GIÁ TRỊ BẰNG NHAU THÌ XUẤT THÔNG BÁO "MATCHED"
        document.getElementById("input-password-register").value == document.getElementById("confirm-password").value && document.getElementById("input-password-register").value !== ''
    ) {
        document.getElementById("message").style.color = "#4a73e8";
        document.getElementById("message").innerHTML = "MATCHED";
    } else if ( // NẾU MỘT TRONG HAI INPUT CÓ GIÁ TRị BẰNG 0 THÌ KHÔNG CÓ HÀNH ĐỘNG
        document.getElementById("input-password-register").value === '' || document.getElementById("confirm-password").value === ''
    ) {
        document.getElementById("message").innerHTML = " ";
    } else if ( // NẾU CẢ HAI INPUT CÓ GIÁ TRị BẰNG 0 THÌ KHÔNG CÓ HÀNH ĐỘNG
        document.getElementById("input-password-register").value === '' && document.getElementById("confirm-password").value === ''
    ) {
        document.getElementById("message").innerHTML = " ";
    } else { // NẾU HAI GIÁ TRỊ INPUT KHÁC NHAU VÀ KHÁC 0 THÌ XUẤT THÔNG BÁO "NOT MATCHING"
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "NOT MATCHING";
    }
};

if (document.getElementById("input-password-register")) {
    document.getElementById("input-password-register").addEventListener("focus", check);
}

if (document.getElementById("confirm-password")) {
    document.getElementById("confirm-password").addEventListener("focus", check);
}