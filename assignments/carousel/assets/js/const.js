const CarouselBox = document.querySelectorAll('.carousel-wrapper')[0];
const CarouselWrapper = document.querySelectorAll('.carousel-wrapper')[0];
const CarouselImages = document.querySelectorAll('.carousel-wrapper img');
const NumberImages =CarouselImages.length;

const carouselWidth = CarouselBox.clientWidth;
const TransitionTime = 500;//Total time for single sliding animation
const TransitionDelay = 6000;//time for automatic transition
const Steps = 10;//steps per sliding animation


const Max = -(NumberImages - 1) * carouselWidth//maximum margin for the images