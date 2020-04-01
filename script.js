/*
  Wat doe je ook alweer in Javascript voor een micro-interactie?
  1. Gebruik de querySelector om een element in je html te selecteren
  2. Koppel een evenListener aan het element om een mouse-event te detecteren
  3. Gebruik het Classlist object om een css class aan een element toe te voegen of weg te halen.
*/

/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

const header = document.querySelector('header');
const section = document.querySelector('section');

let requestURL = 'https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json'; 

let request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
  const movies = request.response;
//  populateHeader(movies);
//  showHeroes(movies);
//    console.log(movies);
    
    for (let i = 0; i < movies.length; i++) {
        let newImg = document.createElement("img");
        let newHeader = document.createElement("h2");
        let newLi = document.querySelector("li");
            newLi.setAttribute("id", "afb" + (i + 1));
        
        newImg.src = movies[i].cover;
        newImg.setAttribute("alt", movies[i].title);
        newHeader.innerHTML = movies[i].title;
        
        newLi.appendChild(newHeader);
        newLi.appendChild(newImg);
        document.body.querySelector("ul").appendChild(newLi);
        
         for (let t = 0; t < movies[i].reviews.length; t++) {
            console.log(movies[i].reviews[t].score);
            let newFavoriet = document.createElement("div");
            document.body.querySelector("main").appendChild(newFavoriet);
        }
    }  
}

var track = document.querySelector('.carousel_track');

//alle slides bij elkaar door children
var slides = Array.from(track.children);
var rButton = document.querySelector('.carousel_button--right');
var lButton = document.querySelector('.carousel_button--left');
var nav = document.querySelector('.carousel_nav');
var bolletje = Array.from(nav.children);


//wanneer ik links klik, naar links bewegen
//wanneer ik rechts klik, naar rechts bewegen

var slideWidth = slides[0].getBoundingClientRect().width;

//de slides naast elkaar zetten
var slidePosition = (slides, index) => {
    slides.style.left = slideWidth * index + 'px';
}

slides.forEach(slidePosition);

var moveToSlide = (track, huidigeSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    huidigeSlide.classList.remove('huidige-slide');
    targetSlide.classList.add('huidige-slide');
}


//wanneer ik rechts klik, naar rechts bewegen
rButton.addEventListener('click', e => {
    var huidigeSlide = track.querySelector('.huidige-slide');
    var volgendeSlide = huidigeSlide.nextElementSibling;
    var huidigeBol = nav.querySelector('.current-slide');
    var volgendeBol = huidigeBol.nextElementSibling;
    //var bewegen = volgendeSlide.style.left;
    //naar de volgende slide gaan
    //track.style.transform = 'translateX(-' + bewegen + ')';
    //huidigeSlide.classList.remove('huidige-slide');
    //volgendeSlide.classList.add('huidige-slide');

    moveToSlide(track, huidigeSlide, volgendeSlide);
});

//wanneer ik links klik, naar links bewegen
lButton.addEventListener('click', e => {
    var huidigeSlide = track.querySelector('.huidige-slide');
    var vorigeSlide = huidigeSlide.previousElementSibling;
    var huidigeBol = nav.querySelector('.current-slide');
    var vorigeBol = huidigeBol.previousElementSibling;
    
    moveToSlide(track, huidigeSlide, vorigeSlide);
    updateBol(huidigeBol, vorigeBol);
});

//bolletje mee laten bewegen
//op welk bolletje klik je?
nav.addEventListener('click', e => {
    var targetBol = e.target.closest('a');
    
    if (!targetBol) return;
    
    var huidigeSlide = track.querySelector('.huidige-slide');
    var huidigeBol = nav.querySelector('.huidige-slide');
    //op welk bolletje klik ik
    var targetIndex = bolletje.findIndex(bol => bol === targetBol);
    var targetSlide = slides[targetIndex];    

    moveToSlide(track, huidigeSlide, targetSlide);
    updateBol(huidigeBol,targetBol);
});

//Bron: https://www.youtube.com/watch?v=gBzsE0oieio
