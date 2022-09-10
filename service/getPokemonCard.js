// Obtenir informació de una carta Pokemon segons el número de la carta que es passa per paràmetre.
export default function getPokemonCard(numPokemon){
    const apiURL = "https://pokeapi.co/api/v2/pokemon/" + numPokemon;
    return fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            const nom = data.name;
            const id = data.id;
            const imatgeFront = data.sprites.front_default;
            const imatgeBack = data.sprites.back_default;
            const atac = data.stats[1].base_stat;
            const defensa = data.stats[2].base_stat;
            const tipus = data.types;
            return {data, id, nom, imatgeFront, imatgeBack, atac, defensa, tipus};
        })
        .catch(function(){
            return "Pokemon number '" + numPokemon + "' does not exists";
        });    
}