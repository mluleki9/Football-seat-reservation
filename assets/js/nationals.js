const select = document.getElementById('nationality');

// Replace 'countries.txt' with the actual filename of your text document
fetch('countries.txt')
  .then(response => response.text()) // Parse text file content
  .then(data => {
    const countries = data.split('\n'); // Split lines into an array
    for (const country of countries) {
      const option = document.createElement('option');
      option.value = country; // Use the country name as the value
      option.text = country;
      select.appendChild(option);
    }
  });