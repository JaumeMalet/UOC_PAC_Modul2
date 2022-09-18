// Enllaços als serveis de JS
// -- Obtenir el nombre total de cartes Pokemon existents a la API
import getPokemonCardsCount from "../service/getPokemonCardsCount.js";
// -- Obtenir informació de una carta Pokemon
import getPokemonCard from "../service/getPokemonCard.js";

// Definició de constants
const PokemonCardsCount = await getPokemonCardsCount();
const cards = document.querySelectorAll('.card-table');
var aPokemonCard = new Array();
const cardTable = document.getElementById("card-table");
const cardTemplate = document.getElementById("card-template").content;

// Carregar el tema segons el que hi hagi guardat en el localStorage
get_tema();
set_tema();

// Obtenir 10 cartes aleatòriament i sense repetir
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
// Ocultar l'animació de càrrega de la pàgina
document.querySelector('#loading').style.display = 'none';

// Afegir funcionalitat i efecte de girar la carta al fer click a sobre de qualsevol d'elles
flip_card_fx();


