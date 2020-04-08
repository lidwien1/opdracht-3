# frontend voor designers - opdracht 3: Een interactie uitwerken met externe data

Ik heb ervoor gekozen om verder te gaan met de carousel, wat ik hiervan nog moest verbeteren:
- de knoppen
- de bolletjes mee laten bewegen
- bedienen met toetsenbord

# stap 1: Data ophalen
Het is mij gelukt om ipv de foto's die ik in opdracht 2 had gebruikt voor de carousel de afbeeldingen van de films te hebben. Nu was het alleen geen carousel meer maar stonden de foto's horizontaal op de pagina en kon je er doorheen scrollen. 

(Ik heb even de width van het beeld veranderd zodat je de foto's iets dichter naast elkaar ziet staan.)

<img width="1375" alt="screen1" src="https://user-images.githubusercontent.com/59923657/78787340-7e626400-79aa-11ea-8ebc-befc4417b7cb.png">)

# stap 2: Het weer op een carousel laten lijken
Als je op de bolletjes klikt wordt je nog steeds verwezen naar de afbeelding waar het bolletje bij hoort. Echter zijn mijn buttons aan de zijkanten verdwenen en ik heb echt alles geprobeerd maar ik krijg ze niet terug. 

Toen ging ik proberen om de afbeeldingen weer op elkaar te krijgen zoals ik dat ook bij de carousel heb gedaan. Dit lukt wel soort van maar de laatste afbeelding kwam bovenop en de bolletje deden het niet meer.

Ik heb in 'script.js' het volgende veranderd:
- regel 52 verwijderd
- regel 55 veranderd naar: var slides = newImg

Dan komt het er zo uit te zien:

![interactie schetsen](iteratie/screen2)

Dit is gelukt met hulp van Sanne, nu ziet het er zo uit:

![interactie schetsen](iteratie/screen3)

Ik heb de buttons meer naar het midden toe gedaan omdat ik dat er mooier uit vind zien, nu ziet het er zo uit:

![interactie schetsen](iteratie/screen4)

# stap 3: Bolletjes mee laten bewegen 
In de video die ik heb gevolgd bij opdracht 2 hebben ze een voorbeeld voor dit maar het werkte bij mij maar niet. Ik heb het opnieuw geprobeerd, weer niet, toen ging ik andere manieren opzoeken, dit lukt helaas ook allemaal niet. Daarna heb ik alle code van dat onderdeel verwijderd en opnieuw geschreven en toen werkte het gelukkig!

# stap 4: Bedienen met toetsenbord
Hier had ik van meerdere mensen een stukje code gekregen om te kijken hoe het moet. Helaas werkte het niet bij mij. Op een gegeven moment wist ik dat ik wel heel dicht bij was maar het lukt maar niet. Toen heb ik hulp gevraagd aan een oud klasgenoot en die heeft het mij uitgelegd. 

# stap 5: Meer informatie toevoegen van de film
Hier heb ik weer hulp gevraagd aan Sanne. Hij heeft een button aangemaakt, als je er op klikt komt er meer informatie over de film. Hij heeft de directors voor gedaan, toen probeerde ik het met de actors. Omdat er meerdere actors bij een film horen moest ik een loop maken en dat lukt helaas niet helemaal. Zelf is het mij wel gelukt om de release date, genre en plot toe te voegen per film.

De film details zien er zo uit:

![interactie schetsen](iteratie/screen5)
