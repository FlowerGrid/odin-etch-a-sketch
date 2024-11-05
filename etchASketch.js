const contentElement = document.querySelector('.content');
const gridElement = document.querySelector('.grid');
const btnContainerElement = document.querySelector('.btn-container')
const shakeButton = document.querySelector('#shake');
const gridSizeButton = document.querySelector('#grid-size');
const gridStyle = window.getComputedStyle(gridElement);
const gridPixelWidth = Number(gridStyle.getPropertyValue('width').replace('px', ''));
console.log(gridPixelWidth);
let gridWidth = 16;

buildGrid(gridWidth);

function getGridSize(gridWidth) {
    return Math.pow(gridWidth, 2)
}

function buildGrid(gridWidth) {
    let gridSize = getGridSize(gridWidth)

    for (let i = 0; i < gridSize; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.id = `square-${i + 1}`
        square.style.width = `${gridPixelWidth / gridWidth}px`;
        square.style.height = `${gridPixelWidth / gridWidth}px`;

        square.addEventListener('mouseenter', () => {
            const style = window.getComputedStyle(square);
            let bgColor = style.getPropertyValue('background-color');
            console.log(bgColor)

            if (bgColor !== 'rgba(0, 0, 0, 0)') {
                let bgOpacity = Number(style.getPropertyValue('opacity')) + .1;
                square.style.opacity = String(bgOpacity);
            } else {
                square.style.backgroundColor = 'rgb(26, 72, 98)';
                square.style.opacity = '.1';
            }
            
        });

        gridElement.appendChild(square);
    }
}

shakeButton.addEventListener('click', () => {
    let squares = document.querySelectorAll('.square');
    for (sq of squares) {
        sq.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});

gridSizeButton.addEventListener('click', () => {
    squares = document.querySelectorAll('.square');
    for (square of squares) {
        gridElement.removeChild(square)
    }

    let newGridWidth;
    do {
        newGridWidth = prompt("Please choose an integer between 2 and 100 inclusive");
        newGridWidth = Number(newGridWidth);
    }
    while (isNaN(newGridWidth) || newGridWidth < 2 || newGridWidth > 100 ||
        newGridWidth * 10 % 10 !== 0);

    
    buildGrid(newGridWidth);

});


btnContainerElement.addEventListener('mouseover', buttonMouseOver);
btnContainerElement.addEventListener('mouseout', buttonMouseOut);

function buttonMouseOver(event) {
    let target = event.target;

    switch (target.getAttribute('id')) {
        case 'shake':
            shakeButton.style.backgroundColor = '#d7dfa3';
            shakeButton.style.color = '#1a4862';
            break;
        case 'grid-size':
            gridSizeButton.style.backgroundColor = '#d7dfa3';
            gridSizeButton.style.color = '#1a4862';
            break;
    }
}

function buttonMouseOut(event) {
    let target = event.target;

    switch (target.getAttribute('id')) {
        case 'shake':
            shakeButton.style.backgroundColor = '#1a4862';
            shakeButton.style.color = '#ebe6e0';
            break;
        case 'grid-size':
            gridSizeButton.style.backgroundColor = '#1a4862';
            gridSizeButton.style.color = '#ebe6e0';
            break;
    }
}