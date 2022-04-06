let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

const leftButton = document.querySelector(".left-btn")
const rightButton = document.querySelector(".right-btn")
const imgContent = document.querySelector(".home-img");
var img = 1;
// console.log(leftButton);
// leftButton.addEventListener("onclick",function(){
//     console.log("img"+img+".avif");
//     imgContent.setAttribute(src,"images/image"+img+".png");
// })
document.querySelector(".left-btn").onclick = function(){
    // console.log("images/image"+img+".png");
    if(img == 3){
        img = 1;
    }
    else
        img++;
    imgContent.setAttribute("src","final/images/image"+img+".png")
}
document.querySelector(".right-btn").onclick = function(){
    // console.log("images/image"+img+".png");
    if(img == 1){
        img = 3;
    }
    else
        img--;
    imgContent.setAttribute("src","final/images/image"+img+".png")
}

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;