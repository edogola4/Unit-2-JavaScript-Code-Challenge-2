// write your code here 

// This event listener waits for the DOM content to be fully loaded before executing the main logic
document.addEventListener('DOMContentLoaded', () => {
    // Select and store references to important DOM elements
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetailImage = document.querySelector('.detail-image');
    const ramenDetailName = document.querySelector('.name');
    const ramenDetailRestaurant = document.querySelector('.restaurant');
    const ramenRatingDisplay = document.getElementById('rating-display');
    const ramenCommentDisplay = document.getElementById('comment-display');
    const newRamenForm = document.getElementById('new-ramen');
  
    // Fetch ramen data from the local server
    fetch('http://localhost:3000/ramens')
      .then(response => response.json()) // Parse the response as JSON
      .then(ramenData => {
        // Once data is fetched, populate the ramen menu
        displayRamenMenu(ramenData);
        // Display details of the first ramen by default, if there's at least one ramen
        if (ramenData.length > 0) {
          displayRamenDetails(ramenData[0]);
        }
      })
      .catch(error => console.error('Error fetching ramen data:', error)); // Log any errors that occur during fetching
  
    // Function to populate the ramen menu with images
    function displayRamenMenu(ramens) {
      ramens.forEach(ramen => {
        // Create a new image element for each ramen
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        // Add click event listener to display ramen details when clicked
        img.addEventListener('click', () => displayRamenDetails(ramen));
        // Append the image to the ramen menu
        ramenMenu.appendChild(img);
      });
    }
  
    // Function to display details of a selected ramen
    function displayRamenDetails(ramen) {
      // Update the detail image
      ramenDetailImage.src = ramen.image;
      ramenDetailImage.alt = ramen.name;
      // Update text content for name, restaurant, rating, and comment
      ramenDetailName.textContent = ramen.name;
      ramenDetailRestaurant.textContent = ramen.restaurant;
      ramenRatingDisplay.textContent = ramen.rating;
      ramenCommentDisplay.textContent = ramen.comment;
    }
  
    // Add event listener for new ramen form submission
    newRamenForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // Create a new ramen object with form input values
      const newRamen = {
        name: document.getElementById('new-name').value,
        restaurant: document.getElementById('new-restaurant').value,
        image: document.getElementById('new-image').value,
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value
      };
  
      // Add the new ramen to the menu and reset the form
      addNewRamenToMenu(newRamen);
      newRamenForm.reset();
    });
  
    // Function to add a new ramen to the menu
    function addNewRamenToMenu(ramen) {
      // Create a new image element for the new ramen
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      // Add click event listener to display the new ramen's details when clicked
      img.addEventListener('click', () => displayRamenDetails(ramen));
      // Append the new ramen image to the menu
      ramenMenu.appendChild(img);
    }
  });
