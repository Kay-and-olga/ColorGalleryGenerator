// The ajax request takes in a query of color in a string format(e.g.‘red’), and returns an array of 10 image objects matching that match the query

// The image urls are fed into src attribute of dynamically created img elements, which are appended to a grid container

// The user can use sliders to adjust the number of grid rows, columns and gap size.The styles of the grid container are changed with the.css() method.The sliders themselves are < input type =”range”> elements, which have.on(‘change’) event listener on them.

// The HTML and CSS of the grid container are retrieved with .html() and.css() methods, these values are stored in variables, which are then appended to containers displaying code.The user can copy the code with ctrl + c(Stretch goal: add a button that will copy the whole code block to clipboard on click)



// namespace object
const app = {};

// our api key
app.apiKey = '_3kOV9_qSimG_aJSFZFK_u2AIEsu5eyM4HAFOQ-OB-Y';

// make function for when user selects a colour
app.chooseColor = function(){

    $("input[name='color']").on('change', function(){

        // clear the grid container before getting images
        $('.galleryGrid').empty();

        // make a variable for the value
        const color = $(this).val();

        // call function to get images from api
        app.getImages(color);
    })
}

// make function to display the images in grid
app.displayImages = function(array){

    array.forEach(function(currentItem){
        // make variable for the image
        const imageUrl = currentItem.urls.full;
        // make variable for the alt
        const altText = currentItem.alt_description;

        // the html to append
        const htmlToAppend = `
            <img src='${imageUrl} alt='${altText}'>
        `;

        // append the html to the page
        $('.galleryGrid').append(htmlToAppend);
    })
}

// make function to get images from api
app.getImages = function(color){

    $.ajax({
        url: 'https://api.unsplash.com/photos/random',
        method: 'GET',
        dataType: 'json',
        data: {
            client_id: app.apiKey,
            query: `${color}`,
            count: 10,
        }
    }).then(function(images){

        app.displayImages(images);
    })
}


// initializing function
app.init = function(){
    // call function for when the user selects a colour
    app.chooseColor();
}

// document ready
$(function(){
    // call initializing function
    app.init();
})