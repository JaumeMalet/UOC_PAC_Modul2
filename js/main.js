// Enllaços als serveis de JS
// -- Obtenir el nombre total de cartes Pokemon existents a la API
import getPokemonCardsCount from "../service/getPokemonCardsCount.js";
// -- Obtenir informació de una carta Pokemon
import getPokemonCard from "../service/getPokemonCard.js";

// Definició de variables
var PokemonCardsCount = await getPokemonCardsCount();
// const cards = document.querySelectorAll('.card-table');
var buscar_text = document.getElementById('buscar_pokemon');
var aPokemonCard = new Array();
var PokemonCard = new Object();
// const fragment = document.createDocumentFragment(); // Es pot utilitzar com a contenidor intermig alhora de crear les cartes mitjançant la plantilla

// consultar si hi ha algun paràmetre a la URL
let params = new URLSearchParams(document.location.search);
let id = params.get("pokeID");
if (id) {
    // Mostrar carta extesa
    const cardExt = document.getElementById("card_ext");
    const cardExtTemplate = document.getElementById("card_ext-template").content;
    let tipus = "";

    PokemonCard = await getPokemonCard(id);
    cardExtTemplate.querySelector('.card_ext-nom').innerHTML = PokemonCard.nom;
    // Si el link de la imatge frontal és 'null' vincular imatge d'un requadre amb el text 'No image'
    if(typeof PokemonCard.imatgeFront === 'string') {
        cardExtTemplate.querySelector('.card_ext-imatge-front').setAttribute('src', PokemonCard.imatgeFront);
    } else {
        cardExtTemplate.querySelector('.card_ext-imatge-front').setAttribute('src', "img/void.png");
    };
    // Si el link de la imatge posterior és 'null' vincular imatge d'un requadre amb el text 'No image'
    if(typeof PokemonCard.imatgeBack === 'string') {
        cardExtTemplate.querySelector('.card_ext-imatge-post').setAttribute('src', PokemonCard.imatgeBack);
    } else {
        cardExtTemplate.querySelector('.card_ext-imatge-post').setAttribute('src', "img/void.png");
    };
    cardExtTemplate.querySelector('.card_ext-imatge-front').setAttribute('alt', PokemonCard.nom);
    cardExtTemplate.querySelector('.card_ext-imatge-post').setAttribute('alt', PokemonCard.nom);
    cardExtTemplate.querySelector('.card_ext-atac').innerHTML = "Atac: " + PokemonCard.atac;
    cardExtTemplate.querySelector('.card_ext-defensa').innerHTML = "Defensa: " + PokemonCard.defensa;
    for (let index = 0; index < PokemonCard.tipus.length; index++) {
        if(index > 0) tipus += ", "
        tipus += PokemonCard.tipus[index].type.name;
    }
    cardExtTemplate.querySelector('.card_ext-tipus').innerHTML = "Tipus: " + tipus;
    // Afegir la carta a la pàgina
    cardExt.appendChild(cardExtTemplate.cloneNode(true));
    
    // mostrar l'enllaç per tornar enrera
    back.style.display = "block";
} else {
    // Obtenir 10 cartes aleatòriament i sense repetir    
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
        cardTemplate.querySelector('a').attributes['href'].value = "?pokeID=" + aPokemonCard[index].id;
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
    // ocultar l'enllaç per tornar enrera
    back.style.display = "none";
}