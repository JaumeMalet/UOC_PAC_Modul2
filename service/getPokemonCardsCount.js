// Obtenir el nombre total de cartes Pokemon existents a la API
export default function getPokemonCardsCount(){
    const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    return fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            const count = data.count;
            return {data, count};
        })
}