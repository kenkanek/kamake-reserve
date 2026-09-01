// ===== header.js - مدیریت وضعیت کاربر در منو =====

function updateUserMenu() {
    const currentUser = JSON.parse(localStorage.getItem('kamake_current_user') || 'null');
    const users = JSON.parse(localStorage.getItem('kamake_users') || '[]');
    const isLoggedIn = currentUser && users.some(u => u.phone === currentUser.phone);

    const registerBtn = document.querySelector('.btn-register');
    if (!registerBtn) return;

    if (isLoggedIn) {
        registerBtn.textContent = '👤 ' + (currentUser.username || currentUser.phone);
        registerBtn.href = 'register.html';
        registerBtn.style.background = '#4A90E2';
        registerBtn.style.boxShadow = '0 4px 12px rgba(74,144,226,0.3)';
        registerBtn.style.color = 'white !important';
        
        const navMenu = registerBtn.closest('.nav-menu');
        if (navMenu && !navMenu.querySelector('.btn-logout-nav')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn-logout-nav';
            logoutBtn.textContent = '🚪 خروج';
            logoutBtn.style.cssText = `
                background: #6c757d;
                color: white !important;
                padding: 8px 20px;
                border-radius: 40px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                transition: 0.3s;
                font-family: 'Vazir', sans-serif;
                font-size: 0.85rem;
            `;
            logoutBtn.onmouseover = () => { logoutBtn.style.background = '#F15A5A'; };
            logoutBtn.onmouseout = () => { logoutBtn.style.background = '#6c757d'; };
            logoutBtn.onclick = function(e) {
                e.preventDefault();
                if (confirm('آیا مطمئن هستید که میخواهید خارج شوید؟')) {
                    localStorage.removeItem('kamake_current_user');
                    window.location.href = 'register.html';
                }
            };
            registerBtn.parentNode.insertBefore(logoutBtn, registerBtn);
        }
    } else {
        registerBtn.textContent = 'ورود / ثبت‌نام';
        registerBtn.href = 'register.html';
        registerBtn.style.background = '#F15A5A';
        registerBtn.style.boxShadow = '0 4px 12px rgba(241,90,90,0.3)';
        registerBtn.style.color = 'white !important';
        
        const logoutBtn = document.querySelector('.btn-logout-nav');
        if (logoutBtn) {
            logoutBtn.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', updateUserMenu);
window.addEventListener('storage', function(e) {
    if (e.key === 'kamake_current_user' || e.key === 'kamake_users') {
        updateUserMenu();
    }
});
window.addEventListener('load', function() {
    setTimeout(updateUserMenu, 100);
});