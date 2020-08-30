const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];






// Unsplash API
const count = 30; /* 30 photos is max per call per API doc */
const apiKey = 'QIsiTVhBHa_NWwpPSXEvQ7yuhP-kiVSa0ehi6SePQhQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all (30) images were loaded from last API fetch
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);

    if (imagesLoaded === totalImages) {

        ready = true;
        loader.hidden = true;
        // console.log('ready =', ready);
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {

    for (const key in attributes) {

        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to DOM

function displayPhotos() {

    imagesLoaded = 0;

    totalImages = photosArray.length;
    // console.log('total images', totalImages);

    // run function for each object in photosArray
    photosArray.forEach((photo) => {

        // create <a> element to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank'); /* open image in new tab */
        setAttributes(item, {

            href: photo.links.html,
            target: '_blank',
        });

        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {

            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);


    });
}





// Get random photos from Unsplash API
async function getPhotos() {

    try {

        const response = await fetch(apiUrl);
        // const data = await response.json();
        // console.log(data);

        photosArray = await response.json();
        // console.log(photosArray);

        displayPhotos();


    } catch (error) {
        // catch error here
    }
}



// check to see if scrolling near bottom of page, load more pics
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {

        ready = false; /* this resets ready until the next time user scrolls to bottom */
        getPhotos();
    }
})




// on load
getPhotos();