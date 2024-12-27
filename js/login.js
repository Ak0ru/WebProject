document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#login-form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();

            if (!email || !password) {
                alert('Please fill out both fields.');
                return;
            }

            try {
                const response = await fetch('/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    window.location.href = data.redirect || '/dashboard.html';
                } else {
                    const errorMessage = await response.text();
                    alert(`Error: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    } else {
        console.error('Login form not found in DOM.');
    }
});
