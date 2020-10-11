/* The Magic happens below */

/* building a grid for the magic screen */
let gridSize = 64;
let pixelNumber = 0;
let column_num = '';

function addGrid() {
    var gridItems = gridSize * gridSize
    var pixelNumber = 0;
    var column_num = '';

    for (let i=0; i<gridSize; i++) { 
        column_num = column_num.concat(' auto')
        
    }
    
    for (let i=0; i<gridItems; i++) {
        
        grid = document.querySelector('.grid-container');
        child = document.createElement('div');
        child.classList.add('grid-item');
        child.id = "pixel-id-"+ pixelNumber;
        grid.appendChild(child);
        
    };
    
    let root =document.documentElement.style.setProperty('--column--number', column_num);
    registerGrid();
};

function lightBackgroud(e) {
div = e.currentTarget;
div.classList.add('lightUp');
};

/* reset the magic screen */

function alertButtonLeft() {
    var allPixels = document.querySelectorAll('[id^="pixel"]');
    allPixels.forEach(pixel => pixel.classList.remove('lightUp'));
      
   }

/* resize the magic screen */

function alertButtonRight(e) {
    var allPixels = document.querySelectorAll('[id^="pixel"]');
    allPixels.forEach(pixel => pixel.classList.remove('lightUp'));
    removeGrid()
    
    while(true){
        var newSize = prompt('What size should the screen be?', '128')
        if( newSize <= 128 && newSize > 0){
            gridSize = newSize;
            break;
        }else{
            alert("Please enter a value less than 128 and greater than zero.");
        }
    }
    addGrid();
   }

   function removeGrid() {
    var allPixels = document.querySelectorAll('[id^="pixel"]');
    allPixels.forEach(pixel => pixel.remove());
   }


/*listen for mouse over events on the magic screen 'pixels' '[id^="pixel"]' */

function registerGrid() {
const allPixels = document.querySelectorAll('[id^="pixel"]');
allPixels.forEach(pixel => pixel.addEventListener('mouseover', lightBackgroud));
}; 

/* register buttons */

const buttonLeft = document.querySelector('.button-left');
buttonLeft.addEventListener('click', alertButtonLeft);
const buttonRight = document.querySelector('.button-right');
buttonRight.addEventListener('click', alertButtonRight);