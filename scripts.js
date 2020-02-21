// namespace object
const app = {};

// our api key
app.apiKey = '_3kOV9_qSimG_aJSFZFK_u2AIEsu5eyM4HAFOQ-OB-Y';
app.apiKeyKay = 'kAOrK_X8Er74XeTEqGJae_ti3NK45tPvRRpxrT-2U7M';



// store images parameters (color, amount and orientation) with default values on page load
app.imageColor = 'purple';
app.imageOrientation = 'squarish';
app.imageAmount = 10;

// stores values for amount of columns and gap size of the gallery chosen by the user
app.columnAmount = 3;
app.gapSize = 5;


// FUNCTIONS THAT DEAL WITH LOADING IMAGES

// when user selects a colour, grab images of that color from the API
app.chooseColor = function () {

    $("input[name='color']").on('change', function () {

        // clear the grid container before getting images
        $('.galleryGrid').empty();

        // assign the value to the global color variable
        app.imageColor = $(this).val();

        // call function to get images from api
        app.getImages();
    })
}


// when user selects an image orientation, grab images with that orientation 
app.chooseOrientation = function () {

    $("input[name='orientation']").on('change', function () {

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
app.chooseAmount = function () {

    $('#imageNumber').on('change', function () {

        // empty the grid container
        $('.galleryGrid').empty();

        // assign the value to the global image amount variable
        app.imageAmount = $(this).val();
        console.log(app.imageAmount);

        // call function to get images from api
        app.getImages();

    })
}


// make function to display the images in grid and grabs html code to display on the page
app.displayImages = function (array) {

    // stores html code to display on the page for user to copy
    let htmlCode = '<div class="galleryGrid"> \n';

    // for each item in array, display the images
    array.forEach(function (currentItem) {

        // make variable for the image
        const imageUrl = currentItem.urls.regular;
        // make variable for the alt
        const altText = currentItem.alt_description;

        // the html to append
        const htmlToAppend = 
        `\t <img class="galleryImg" src='${imageUrl} alt='${altText}'> \n`;

        // append the html to the page
        $('.galleryGrid').append(htmlToAppend);
        
        // add code to the page for the user to copy
        htmlCode += htmlToAppend;
    })

    htmlCode += '</div>';
    // appends the generated code block to the page
    $('#htmlBlock pre').text(htmlCode);

    // set value of input to the html code for copy
    $('input#hiddenHtmlCode').val(htmlCode);
}


// make function to get images from api
app.getImages = function () {

    $.ajax({
        url: 'https://api.unsplash.com/photos/random',
        method: 'GET',
        dataType: 'json',
        data: {
            client_id: app.apiKeyKay,
            query: `${app.imageColor}`,
            count: `${app.imageAmount}`,
            orientation: `${app.imageOrientation}`,
        },
    }).then(function (images) {
        // call function to display images
        app.displayImages(images);
    })
}
// END OF FUNCTIONS THAT DEAL WITH LOADING IMAGES



// FUNCTIONS THAT DEAL WITH DISPLAYING CODE

// generates formatted css code for the gallery and displays in on the page
app.getCssCode = function () {

    const cssCode =
    `.galleryGrid {
    display: grid;
    grid-template-columns: repeat(${app.columnAmount}, 1fr);
    grid-gap: ${app.gapSize}px;
}

.galleryImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
}`;

    $('#cssBlock pre').html(cssCode);

    // set value of input to the css to copy
    $('input#hiddenCssCode').val(cssCode);

}

// shows the code modal window when user clicks the button to grab code to copy
app.showCode = function(){
    $('.modalOpen').on('click', function(){
        $('.modalContainer').addClass('show');
    })
}

// hides the code when user clicks button to close
app.hideCode = function () {
    $('.modalClose').on('click', function () {
        $('.modalContainer').removeClass('show');
    })
}

// copies the code to the clipboard when the copy buttons are clicked
// takes parameter of the input to take value of 
// got help with this from:
// https://codepen.io/shaikmaqsood/pen/XmydxJ
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
app.copyCode = function(element){
    const textToCopy = $(element);
    textToCopy.select();
    document.execCommand("copy");
}
// END OF FUNCTIONS THAT DEAL WITH DISPLAYING CODE



// FUNCTIONS THAT DEAL WITH STYLING THE GRID

// changes amount of columns in the gallery grid
// Acceptable values: 2-5;
app.changeColumns = function () {
    $('#columns').on('change', function () {

        // stores the amount of columns chosen by the user
        app.columnAmount = parseInt($(this).val());

        // updates the gallery container's styles
        $('.galleryGrid').css('grid-template-columns', `repeat(${app.columnAmount}, 1fr`);
        // call the show slider input function
        app.showSliderInput();
        // updates the displayed code
        app.getCssCode()
        
    })
}

// changes the size of grid gap in the gallery grid. 
// Acceptable values: 5 - 40px
app.changeGap = function () {
    $('#gap').on('change', function () {

        // stores the amount of columns chosen by the user
        app.gapSize = parseInt($(this).val());
        console.log(app.gapSize);
        // updates the gallery container's styles
        $('.galleryGrid').css('grid-gap', `${app.gapSize}px`);

        // call the show slider input function
        app.showSliderInput();
        
        // updates the displayed code
        app.getCssCode();
    })
}


// function that displays the value of the slider inputs
app.showSliderInput = function(){
    // save them in variables
    let columnValue = $('input#columns').val();
    let gapValue = $('input#gap').val();

    // append on page
    $('#columnAmount').text(`${columnValue}`);
    $('#gapAmount').text(`${gapValue}`);
}


// END OF FUNCTIONS THAT DEAL WITH STYLING THE GRID




// MISC FUNCTIONS
app.openSocialOnHover = function() {

    $('#kay').on('mouseenter', function() {
        $('#kay ul').css('left', '0');
    })

    $('#kay').on('mouseleave', function () {
        $('#kay ul').css('left', '-100%');
    })

    $('#olga').on('mouseenter', function () {
        $('#olga ul').css('left', '0');
    })
    
    $('#olga').on('mouseleave', function () {
        $('#olga ul').css('left', '-100%');
    })
    
}
// END OF MISC FUNCTIONS


// initializing function
app.init = function () {
    // shows social links on hover
    app.openSocialOnHover();
    // show the value of the slider inputs
    app.showSliderInput();
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

    // grabs gallery code for the user to copy
    app.getCssCode();

    // call function for when user wants to grab the code
    app.showCode();

    // call function for when user wants to close the code modal
    app.hideCode();

    // call function for when user clicks button to copy the html code
    $('#copyHTML').on('click', function(){
        app.copyCode(`input#hiddenHtmlCode`);
    });

    // call function for when user clicks button to copy the css code
    $('#copyCss').on('click', function () {
        app.copyCode(`input#hiddenCssCode`);
    });
    

}

// document ready
$(function () {
    // call initializing function
    app.init();
})