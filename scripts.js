//* The ajax request takes in a query of color in a string format(e.g.‘red’), and returns an array of 10 image objects matching that match the query

// The image urls are fed into src attribute of dynamically created img elements, which are appended to a grid container

// The user can use sliders to adjust the number of grid rows, columns and gap size.The styles of the grid container are changed with the.css() method.The sliders themselves are < input type =”range”> elements, which have.on(‘change’) event listener on them.

// The HTML and CSS of the grid container are retrieved with .html() and.css() methods, these values are stored in variables, which are then appended to containers displaying code.The user can copy the code with ctrl + c(Stretch goal: add a button that will copy the whole code block to clipboard on click)

// namespace object
const app = {};

// our api key
app.apiKey = '_3kOV9_qSimG_aJSFZFK_u2AIEsu5eyM4HAFOQ-OB-Y';
app.apiKeyKay = 'kAOrK_X8Er74XeTEqGJae_ti3NK45tPvRRpxrT-2U7M';


// variables to hold code blocks to display and allow the user to copy ~OLGA
app.gridCodeHTML;
app.gridCodeCSS;

// store images parameters (color, amount and orientation) with default values on page load
app.imageColor = 'purple';
app.imageOrientation = 'squarish';
app.imageAmount = 10;


// FUNCTIONS THAT DEAL WITH LOADING IMAGES
// when user selects a colour, grab images of that color from the API
app.chooseColor = function(){

    $("input[name='color']").on('change', function(){

        // clear the grid container before getting images
        $('.galleryGrid').empty();

        // assign the value to the global color variable
        app.imageColor = $(this).val();

        // call function to get images from api
        app.getImages();
    })
}


// when user selects an image orientation, grab images with that orientation 
app.chooseOrientation = function(){

    $("input[name='orientation']").on('change', function() {

        // empty the grid container
        $('.galleryGrid').empty();

        // assign the value to the global orientation variable
        app.imageOrientation = $(this).val();
        console.log(app.imageOrientation);

        // call function to get images from api
        app.getImages()
    })
}


// user can select how many images they want to load (5-20 is an acceptable value)
app.chooseAmount = function() {

    $('#imageNumber').on('change', function() {

        // empty the grid container
        $('.galleryGrid').empty();

        // assign the value to the global image amount variable
        app.imageAmount = $(this).val();
        console.log(app.imageAmount);

        // call function to get images from api
        app.getImages();

    })
}


// make function to display the images in grid
app.displayImages = function(array){

    // for each item in array, display the images
    array.forEach(function(currentItem){
        // make variable for the image
        const imageUrl = currentItem.urls.regular;
        // make variable for the alt
        const altText = currentItem.alt_description;

        // the html to append
        const htmlToAppend = `
            <img class="galleryImg" src='${imageUrl} alt='${altText}'>
        `;
        // append the html to the page
        $('.galleryGrid').append(htmlToAppend);
    })
}


// make function to get images from api
app.getImages = function(){

    $.ajax({
        url: 'https://api.unsplash.com/photos/random',
        method: 'GET',
        dataType: 'json',
        data: {
            client_id: app.apiKey,
            query: `${app.imageColor}`,
            count: `${app.imageAmount}`,
            orientation: `${app.imageOrientation}`,
        },
    }).then(function(images){
        // call function to display images
        app.displayImages(images);
    })
}
// END OF FUNCTIONS THAT DEAL WITH LOADING IMAGES



// FUNCTIONS THAT DEAL WITH STYLING THE GRID

// changes amount of columns in the gallery grid
// Acceptable values: 2-5;
app.changeColumns = function() {
    $('#columns').on('change', function() {

        // stores the amount of columns chosen by the user
        const columnAmount = parseInt($(this).val());
        // updates the gallery container's styles
        $('.galleryGrid').css('grid-template-columns', `repeat(${columnAmount}, 1fr`);
    })
}

// changes the size of grid gap in the gallery grid. 
// Acceptable values: 5 - 40px
app.changeGap = function() {
    $('#gap').on('change', function() {

        // stores the amount of columns chosen by the user
        const gapAmount = parseInt($(this).val());
        // updates the gallery container's styles
        $('.galleryGrid').css('grid-gap', `${gapAmount}px`);
    })
}
// END OF FUNCTIONS THAT DEAL WITH STYLING THE GRID


// FUNCTIONS THAT DEAL WITH DISPLAYING CODE
app.getCode = function() {
    // app.gridCodeHTML = $('.galleryGrid').html();
    // console.log(app.gridCodeHTML);

    app.gridCodeCSS = $('.galleryGrid').css();
    console.log(app.gridCodeCSS);
}



// END OF FUNCTIONS THAT DEAL WITH DISPLAYING CODE





// initializing function
app.init = function(){
    // loads images into the grid on page load
    app.getImages();
    // call function for when the user selects a colour
    app.chooseColor();
    // call function for when the user selects image orientation
    app.chooseOrientation();
    // call function for when the user selects amount of images loaded
    app.chooseAmount();

    // change the amount of columns in the grid
    app.changeColumns();
    // change the size of grid gap
    app.changeGap();

    // app.getCode();
}

// document ready
$(function(){
    // call initializing function
    app.init();
})