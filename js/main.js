// Enllaços als serveis de JS
// -- Obtenir el nombre total de cartes Pokemon existents a la API
import getPokemonCardsCount from "../service/getPokemonCardsCount.js";
// -- Obtenir informació de una carta Pokemon
import getPokemonCard from "../service/getPokemonCard.js";

// Definició de constants
var PokemonCardsCount = await getPokemonCardsCount();
var PokemonCard = await getPokemonCard(Math.floor(Math.random() * PokemonCardsCount.count));

// xDebug
console.log(PokemonCardsCount);
console.dir(PokemonCard);   