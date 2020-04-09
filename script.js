/*
  Wat doe je ook alweer in Javascript voor een micro-interactie?
  1. Gebruik de querySelector om een element in je html te selecteren
  2. Koppel een evenListener aan het element om een mouse-event te detecteren
  3. Gebruik het Classlist object om een css class aan een element toe te voegen of weg te halen.
*/

/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

/****     DATA UIT EXTERNE BRON     ****/

var requestURL = 'https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

/* dit doen als de data terugkomt van de server */
/* hier wordt de carrousel gevuld met de films */
request.onload = function () {
    const movies = request.response;

    for (let i = 0; i < movies.length; i++) {
        // voor elke film een li met titel, foto en reviews aanmaken en toevoegen
        let newLi = document.createElement("li");
        newLi.id = "slide" + (i + 1);
        newLi.classList.add("carousel_slide");

        // de titel 
        let newHeader = document.createElement("h2");
        newHeader.innerHTML = movies[i].title;
        newLi.appendChild(newHeader);

        // de cover
        let newImg = document.createElement("img");
        newImg.src = movies[i].cover;
        newImg.alt = movies[i].title;
        newLi.appendChild(newImg);

        // de reviews
        let newReviews = document.createElement("ul");
        for (let t = 0; t < movies[i].reviews.length; t++) {
            let newReview = document.createElement("li");
            newReview.innerHTML = movies[i].reviews[t].score
            newReviews.appendChild(newReview);
        }
        newLi.appendChild(newReviews);

/* DETAILS TOEVOEGEN MET KNOPJE EN "LIGHTBOX" */

        /* details button aanmaken */
        let infoKnop = document.createElement("button");
        /* tekst is i */
        infoKnop.innerHTML = "I";
        /* en een class moreInfo */
        infoKnop.value = "moreInfo";

        /* de button laten luisteren naar clicks */
        /* dan wordt de class showDetails aan de body toegevoegd */
        /* met die class wordt met CSS de details getoond */
        infoKnop.addEventListener("click", function () {
            console.log("klik");
            this.parentNode.classList.add("showDetails");
        })

        /* de knop toevoegen aan de film */
        newLi.appendChild(infoKnop);

        /* de details aanmaken */
        /* beginnen met een container waar alle details in kunnen */
        let movieDetails = document.createElement("section");

        /* de details laten luisteren naar clicks */
        /* dan wordt de class showDetails aan de body verwijderd */
        /* met die class wordt met CSS de details weer verstopt */
        /* je kunt dus op het hele vlak van de details klikken om de details te verwijderen */
        movieDetails.addEventListener("click", function () {
            console.log("klik");
            this.parentNode.classList.remove("showDetails");
        })

        /* de details vullen met info */
        /* release date */
        let releaseText = document.createElement("p");
        let releaseDate = document.createElement("date");
        releaseDate.innerHTML = movies[i].release_date;
        releaseText.innerHTML = 'Release Date: ';
        releaseText.appendChild(releaseDate);

        movieDetails.appendChild(releaseText);

        /* actors */
        let actorsLabel = document.createElement("dt");
        /* het directorLabel vullen met een stringetje "regisseur:" */
        actorsLabel.innerHTML = "Actors:";
        
        movieDetails.appendChild(actorsLabel);

        let actorsArray = movies[i].actors;
        /* de actors zijn er wel meer - loopje nodig */
        /* definition list */
        for (let t = 0; t < actorsArray.length; t++) {
            let actorTekst = document.createElement("dd");
            actorTekst.innerHTML = actorsArray[t].actor_name;
            
            movieDetails.appendChild(actorTekst);
        }

        /* genre */
        let genre = document.createElement("p");
        genre.innerHTML = "Genre: " + movies[i].genres;
        
        movieDetails.appendChild(genre);

        /* directors */
        /* de p waar straks de tekst inkomt - deze wordt toegevoegd aan de film */
        let directorTekst = document.createElement("p");
        /* de regisseur info uit de movie halen */
        /* dat is een array met 1 item */
        let directorsArray = movies[i].directors;
        /* de naam van de regisseur uit de array halen */
        /* er is maar 1 regisseur */
        /* de info zit in het eerste element in de array --> dus index 0*/
        /* en daarvan dan het attribuut name */
        let directorName = directorsArray[0].name;
        /* de directorTekst vullen met een stringetje "regisseur: " plus de directorName */
        directorTekst.innerHTML = "Regisseur: " + directorName;
        /* de directorTekst toevoegen aan de film */
        movieDetails.appendChild(directorTekst);

        /* plot */
        let plot = document.createElement("p");
        plot.innerHTML = 'Plot: ' + movies[i].plot;
        
        movieDetails.appendChild(plot);


        /* de details toevoegen aan de film */
        newLi.appendChild(movieDetails);


/****     DE CARROUSEL     ****/

        document.body.querySelector("ul.carousel_track").appendChild(newLi);

        /* voor elke film een bolletje aanmaken en toevoegen */
        let newBolletje = document.createElement("a");
        newBolletje.classList.add("carousel_indicator");

        document.body.querySelector("nav.carousel_nav").appendChild(newBolletje);
    }


    /* de eerste li de class huidige-slide geven */
    document.body.querySelector("ul.carousel_track li:first-child").classList.add("huidige-slide");
    /* eerste bolletje de class current-slide */
    document.body.querySelector("nav.carousel_nav a:first-child").classList.add("current-slide");


    /* als de carrousel gevuld is, kan de interactie geinitieerd worden */
    initieerInteractie();
}

function initieerInteractie() {
    var track = document.querySelector('.carousel_track');
    //alle slides bij elkaar door children
    var slides = Array.from(track.children);
    var rButton = document.querySelector('.carousel_button--right');
    var lButton = document.querySelector('.carousel_button--left');

    var nav = document.querySelector('.carousel_nav');
    var bolletje = Array.from(nav.children);
    
    // laat zien hoe breed de slide is
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

    var updateBolletje = (huidigeBol, targetBol) => {
        huidigeBol.classList.remove('current-slide');
        targetBol.classList.add('current-slide');
    }

    //wanneer ik links klik, naar links bewegen
    lButton.addEventListener('click', e => {

        function goRight() {
            var huidigeSlide = track.querySelector('.huidige-slide');
            var vorigeSlide = huidigeSlide.previousElementSibling;
            var huidigeBol = nav.querySelector('.current-slide');
            var vorigeBol = huidigeBol.previousElementSibling;

            moveToSlide(track, huidigeSlide, vorigeSlide);
            updateBolletje(huidigeBol, vorigeBol);
        }
    });

    //wanneer ik rechts klik, naar rechts bewegen
    rButton.addEventListener('click', e => {
        function goLeft() {
            var huidigeSlide = track.querySelector('.huidige-slide');
            var volgendeSlide = huidigeSlide.nextElementSibling;
            var huidigeBol = nav.querySelector('.current-slide');
            var volgendeBol = huidigeBol.nextElementSibling;

            moveToSlide(track, huidigeSlide, volgendeSlide);
            updateBolletje(huidigeBol, volgendeBol);

        }
    });

    // Bolletje laten meebewegen

    nav.addEventListener('click', e => {
        //Op welk bolletje is geklikt?
        var targetBol = e.target.closest('a');

        if (!targetBol) return;

        var huidigeSlide = track.querySelector('.huidige-slide');
        var huidigeBol = nav.querySelector('.current-slide')
        var targetIndex = bolletje.findIndex(bol => bol === targetBol);
        var targetSlide = slides[targetIndex];

        moveToSlide(track, huidigeSlide, targetSlide);
        updateBolletje(huidigeBol, targetBol);

    })

    // Bedienen met toetsenbord

    lButton.addEventListener('click', e => {
        goLeft()
    });

    rButton.addEventListener('click', e => {
        goRight()
    });

    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 37) {
            goLeft();
        }
        if (e.keyCode == 39) {
            goRight();
        }
    });

    function goRight() {
        var huidigeSlide = track.querySelector('.huidige-slide');
        var volgendeSlide = huidigeSlide.nextElementSibling;
        var huidigeBol = nav.querySelector('.current-slide');
        var volgendeBol = huidigeBol.nextElementSibling;

        moveToSlide(track, huidigeSlide, volgendeSlide);
        updateBolletje(huidigeBol, volgendeBol);
    }

    function goLeft() {
        var huidigeSlide = track.querySelector('.huidige-slide');
        var vorigeSlide = huidigeSlide.previousElementSibling;
        var huidigeBol = nav.querySelector('.current-slide');
        var vorigeBol = huidigeBol.previousElementSibling;

        moveToSlide(track, huidigeSlide, vorigeSlide);
        updateBolletje(huidigeBol, vorigeBol);
    }
}

//Bron: https://www.youtube.com/watch?v=gBzsE0oieio
//Bron: Sanne + uitleg

/*
document.addEventListener("keydown", function (e) {
    console.log(e.keyCode);
}, false);
//Guus Groenink: Met deze code kun je in de console kijken welke key welke code heeft in de console. Vervolgens kun je zoiets doen om een functie toe te wijzen aan een bepaalde keydown
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 37) {
        goLeft();
    }
    if (e.keyCode == 39) {
        goRight();
    }
}, false);
*/


/*
var slides_length = slides.length;

function arrowRight() {
    i--;
    if (i > 0) {
        i = slides_length -1;
    }
    slides[i].checked = true;
}

function arrowLeft() {
    i--;
    if (i < 0) {
        i = slides_length -1;
    }
    slides[i].checked = true;
}

function toetsenbord(event){
    if (event.key == "ArrowRight") {
        arrowRight();
    } else if (event.key == "ArrowLeft") {
        arrowLeft();
    }
}

window.addEventListener("keydown", toetsenbord); 
*/
