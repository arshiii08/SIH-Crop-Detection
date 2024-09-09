document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
        container?.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
        container?.classList.remove("right-panel-active");
    });

    async function signUp() {
        const name = document.getElementById('signUpName')?.value;
        const email = document.getElementById('signUpEmail')?.value;
        const password = document.getElementById('signUpPassword')?.value;

        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        signUpButton.disabled = true;

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                alert('User created successfully');
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to server');
        } finally {
            signUpButton.disabled = false;
        }
    }

    async function signIn() {
        const email = document.getElementById('signInEmail')?.value;
        const password = document.getElementById('signInPassword')?.value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        signInButton.disabled = true;

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert('User logged in successfully');
            } else {
                const error = await response.json();
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to server');
        } finally {
            signInButton.disabled = false;
        }
    }

    // Check for the Base64 string in localStorage
    const cvBase64 = localStorage.getItem('cvBase64');
    if (!cvBase64) {
        console.warn('Cv Base64 string not found in storage');
    } else {
        console.log('Cv Base64 string found:', cvBase64);
        // Continue with your logic
    }

    // Ensure file input exists before using it
    const fileInput = document.getElementById('fileInputId');
    if (!fileInput) {
        console.error('File input element not found');
    } else {
        // Continue with file upload logic
    }

    // Ensure fieldMappings is not empty before saving to localStorage
    const fieldMappings = {}; // Assuming this is defined somewhere in your code
    if (Object.keys(fieldMappings).length === 0) {
        console.warn('fieldMappings is empty, not saving to localStorage');
    } else {
        localStorage.setItem('fieldMappings', JSON.stringify(fieldMappings));
    }
});
