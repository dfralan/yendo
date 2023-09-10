// Get a reference to the scrolling div
const scrollingDiv = document.getElementById('scrollingDiv');

// Set the empty space character and calculate its width
const emptySpaceChar = '\u2002'; // You can use different Unicode space characters
const emptySpaceWidth = getTextWidth(emptySpaceChar);

// Clone the content and add spaces based on div width and space character width
const originalText = scrollingDiv.textContent;
const divWidth = scrollingDiv.clientWidth;
const numSpaces = Math.ceil((divWidth / 3.9) / emptySpaceWidth) + 1;
const spacer = emptySpaceChar.repeat(numSpaces);
const modifiedText = spacer + originalText + spacer;

// Set the initial scroll position
let scrollLeft = 0;

// Define the speed and direction of scrolling (positive for scrolling right, negative for scrolling left)
const scrollSpeed = 2;

// Create a function to perform the auto-scrolling
function autoScroll() {
  // Update the scroll position
  scrollLeft += scrollSpeed;

  // Apply the new scroll position to the div
  scrollingDiv.scrollLeft = scrollLeft;

  // Check if we have reached the end of the content and reset the scroll position if needed
  if (scrollLeft >= scrollingDiv.scrollWidth - scrollingDiv.clientWidth) {
    scrollLeft = 0; // Reset to the beginning
  }

  // Schedule the next frame for smooth scrolling
  requestAnimationFrame(autoScroll);
}

// Set the modified text content
scrollingDiv.textContent = modifiedText;

// Function to calculate the width of a text string
function getTextWidth(text) {
  const span = document.createElement('span');
  span.style.visibility = 'hidden';
  span.style.whiteSpace = 'nowrap';
  span.textContent = text;
  document.body.appendChild(span);
  const width = span.getBoundingClientRect().width;
  document.body.removeChild(span);
  return width;
}

// Start the auto-scrolling
autoScroll();
