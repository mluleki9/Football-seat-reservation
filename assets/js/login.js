const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Simulate login process (replace with actual validation)
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'password') {
    alert('Login successful!');
    // Redirect to dashboard or something
  } else {
    alert('Invalid username or password');
  }
});