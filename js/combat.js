// Enllaços als serveis de JS
// -- Obtenir el nombre total de cartes Pokemon existents a la API
import getPokemonCardsCount from "../service/getPokemonCardsCount.js";
// -- Obtenir informació de una carta Pokemon
import getPokemonCard from "../service/getPokemonCard.js";

// Definició de constants
var PokemonCardsCount = await getPokemonCardsCount();
// var PokemonCard = await getPokemonCard(Math.floor(Math.random() * PokemonCardsCount.count));

const cards = document.querySelectorAll('.card-table');

// Obtenir 10 cartes aleatòriament i sense repetir
var aPokemonCard = new Array();
const cardTable = document.getElementById("card-table");
const cardTemplate = document.getElementById("card-template").content;

for (let index = 0; index < 10; index++) {
    // Obtenir l'informació d'una carta
    aPokemonCard[index] = await getPokemonCard(Math.floor(Math.random() * PokemonCardsCount.count));
    // Comprovar si la carta no existeix tornem a repetir aquesta iteració del for
    if(typeof aPokemonCard[index].atac === 'undefined') {
        // console.log("undefined");
        index--;
        continue;
    }
    // Comprovar que no s'ha repetit la carta
    for (let index2 = 0; index2 < index; index2++) {
        if(aPokemonCard[index].id == aPokemonCard[index2].id) {
            // console.log("Repetit: " + aPokemonCard[index].nom);
            index--;
            continue;
        }
    }
    // Omplir la plantilla de la carta amb la informació del Pokémon
    cardTemplate.querySelector('.card-nom').innerHTML = aPokemonCard[index].nom;
    // Si el link de la imatge és 'null' vincular imatge d'un requadre amb el text 'No image'
    if(typeof aPokemonCard[index].imatgeFront === 'string') {
        cardTemplate.querySelector('.card-imatge').setAttribute('src', aPokemonCard[index].imatgeFront);
    } else {
        cardTemplate.querySelector('.card-imatge').setAttribute('src', "img/void.png");
    };
    cardTemplate.querySelector('.card-imatge').setAttribute('alt', aPokemonCard[index].nom);
    cardTemplate.querySelector('.card-atac').innerHTML = "Atac: " + aPokemonCard[index].atac;
    cardTemplate.querySelector('.card-defensa').innerHTML = "Defensa: " + aPokemonCard[index].defensa;
    // Afegir la carta a la pàgina
    cardTable.appendChild(cardTemplate.cloneNode(true));
}


// Afegir funcionalitat de girar la carta al fer-hi click
var flip_cards = document.querySelectorAll('.flip-card');
var flipped_cards_index = 0;
var flipped_card_val = new Object();
var flipped_cards_array = new Array();

flip_cards.forEach((flip_card) => {
    flip_card.addEventListener('click', function() {
        flip_card.classList.add('flipped');
        flipped_card_val =
        {
            "card_nom": flip_card.querySelector('.card-nom').textContent,
            "card_atac": (flip_card.querySelector('.card-atac').textContent).split(" ")[1],
            "card_defensa": (flip_card.querySelector('.card-defensa').textContent).split(" ")[1]
        }
        flip_card_func(flipped_card_val); 
    });
});


// Comprovar si ja hi ha 2 cartes girades per començar el combat
function flip_card_func(obj) {
    flipped_cards_index++; // Index de la carta girada
    flipped_cards_array[flipped_cards_index] = JSON.parse(JSON.stringify(obj)); // Guardar valors carta girada

    if(flipped_cards_index == 2) {
        // Tenim 2 cartes girades, començar el combat:
        setTimeout(function() { // Executar funció després d'un retard de 0.5s per deixar temps perquè es gira la segona carta.
            // Missatge resultat del combat:
            if(Number(flipped_cards_array[1].card_atac) > Number(flipped_cards_array[2].card_defensa)) {
                alert("'" + flipped_cards_array[1].card_nom + "' ataca i guanya a '" + flipped_cards_array[2].card_nom + "'");
            }
            else {
                alert("'" + flipped_cards_array[1].card_nom + "' ataca i perd contra '" + flipped_cards_array[2].card_nom + "'");
            }
            // Recarregar la pàgina de combat
            window.location.reload();
        }, 500)
    }
}


