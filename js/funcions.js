//Funció que mostra o amaga les cartes pokemon segons si contenen en el nom el text de l'input del div que
//es passa per paràmetre.
function buscar(div_text) {
    //Obtenir els divs de totes les cartes
    var aCartes = document.getElementsByClassName('card');
    //Buscar en cada un dels divs carta
    for (let index = 0; index < aCartes.length; index++) {
        //Obtenir el nom de la carta
        var nom = aCartes[index].querySelector('.card-nom').textContent;
        //Comprovar si existeix el text que es busca en el nom de la carta
        if(nom.indexOf(div_text.value) >= 0)
        {
            //Text existeix >> Mostrar carta
            aCartes[index].style.display = '';
        }
        else
        {
            //TExt no existeix >> Amagar carta
            aCartes[index].style.display = 'none';
        }        
    }
};