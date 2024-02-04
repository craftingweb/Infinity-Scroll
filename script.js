const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false; // when page first load it will be false;
let imagesLoaded = 0; // how many images are loaded (30)
let totalImages = 0; // keep tracking all images that's why we will know when if it finish loading

let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "1ZnFp8j9MRwM5zArruC7OgjGcjq6TEVP7NLNvwveJW8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  // console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log("ready", ready);
  }
}
// Helper function to set attributes for DOM Elements
function setAttributes(element, atributes) {
  for (const key in atributes) {
    element.setAttribute(key, atributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // console.log("total images", totalImages);
  // Run function for each object (element)
  photosArray.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // check if finishing loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>, then both put inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of the page. Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
  // console.log("scrolled");
  // console.log(window.innerHeight);
  // console.log(window.scrollY);
  // console.log(document.body.offsetHeight);
});
// On load
getPhotos();
