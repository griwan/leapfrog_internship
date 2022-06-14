//main function that controls the carousel
function mainAction(e) {
	if (e <= 0) {
		currentImage = NumberImages
	} 
	else if (e > NumberImages) {
		currentImage = 1
	} 
	else {
		currentImage = e;
	}

	let transitionWidth = -(currentImage - 1) * carouselWidth;
	slidingAnimation(transitionWidth)


	let dots = document.querySelectorAll('.dot');
	for (i = 0; i < NumberImages; i++) {
		if (i == currentImage - 1) {
			dots[i].classList.add('active')
		} else {
			dots[i].classList.remove('active')
		}
	}
	
}


//animation for the sliding 

function slidingAnimation(width) {
	let carouselProperty = getComputedStyle(CarouselWrapper);
	let initialMargin = parseInt(carouselProperty.marginLeft);
	let step = (initialMargin - width) / Steps;
	
	let transitInterval = setInterval(function () {

		let carouselPropertyTemp = getComputedStyle(CarouselWrapper);
		let marginValue = parseInt(carouselPropertyTemp.marginLeft);


		//check if the values exceed the boundary

		
		if (marginValue > 0) {
			CarouselWrapper.style.marginLeft = '0px';
			currentImage = 1;
			clearInterval(transitInterval);
		} 
		else if (marginValue < Max) {
			CarouselWrapper.style.marginLeft = Max + 'px';
			currentImage = NumberImages - 1;
			clearInterval(transitInterval);
		} 
		else if (marginValue == width) {
			clearInterval(transitInterval)
		} 
		else {
			CarouselWrapper.style.marginLeft = marginValue - step + 'px';
		}
	}, (TransitionTime / Steps))
}


rightBtn.addEventListener('click', ()=>{
	mainAction(currentImage + 1)
})
leftBtn.addEventListener('click',()=> {
	mainAction(currentImage - 1)
})

//automatic transition

setInterval(function () {
	mainAction(currentImage + 1)
}, TransitionDelay)