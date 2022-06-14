let currentImage = 1;

//adding left and right controls 

let controls = document.createElement('div')
controls.classList.add('controls')
CarouselWrapper.appendChild(controls)

let leftBtn = document.createElement('div')
leftBtn.classList.add('carousel-btn','left-btn')
controls.appendChild(leftBtn)

let rightBtn = document.createElement('div')
rightBtn.classList.add('carousel-btn','right-btn')
controls.appendChild(rightBtn)

//adding dots to indicate the image position

let dotsContainer = document.createElement('div')
dotsContainer.classList.add('dot-container')
dotsContainer.style.textAlign = 'center';

for (let i = 0; i < NumberImages; i++) {
    let dot = document.createElement('div')
    dot.classList.add('dot')
    dot.setAttribute('index', i + 1)
    dot.addEventListener('click', function (i) {
        slideOperation(i.target.getAttribute('index'))
    })
    dotsContainer.appendChild(dot)
}

controls.appendChild(dotsContainer)




