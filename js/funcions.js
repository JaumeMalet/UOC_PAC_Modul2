// Canvia el radio button seleccionat del tema de la pàgina segons el valor guardat en el localstorage
function get_tema() {
    //Obtenir els diferents radio buttons del tema
    const tema = document.getElementsByName('radio_tema');
    //Si no hi ha guardat cap preferencia d'usuari es selecciona el primer tema: 'clar'
    if(localStorage.getItem('tema') == null) tema[0].click()
    //Comprovar un per un quin radio button està seleccionat
    tema.forEach(element => {
        //Per el radio button seleccionat:
        if(element.value == localStorage.getItem('tema')) element.click()
    });
};



// Canvia el tema de la pàgina segons el radio button seleccionat
function set_tema() {
    //Obtenir els diferents radio buttons del tema
    const tema = document.getElementsByName('radio_tema');
    //Obtenir l'element body
    const body = document.getElementById('body');
    //Comprovar un per un quin radio button està seleccionat
    tema.forEach(element => {
        //Per el radio button seleccionat:
        if(element.checked)
        {
            //En l'element body:
            //Esborrar qualsevol classe que tingui definida
            if(body.classList.value.length > 0) body.classList.remove(body.classList.value);
            //Afegir el nom de la classe del radio button
            body.classList.add(element.value);
            //Memoritzar el valor
            localStorage.setItem("tema", element.value);
        }
    });
};



// Mostra o amaga les cartes pokémon segons si contenen en el 
// nom el text de l'input del div que es passa per paràmetre.
function buscar(div_text) {
    //Obtenir els divs de totes les cartes
    const aCartes = document.getElementsByClassName('card');
    //Buscar en cada un dels divs carta
    for (let index = 0; index < aCartes.length; index++) {
        //Obtenir el nom de la carta
        const nom = aCartes[index].querySelector('.card-nom').textContent;
        //Comprovar si existeix el text que es busca en el nom de la carta
        if(nom.indexOf(div_text.value) >= 0)
        {
            //Text existeix >> Mostrar carta
            aCartes[index].style.display = '';
        }
        else
        {
            //Text no existeix >> Amagar carta
            aCartes[index].style.display = 'none';
        }        
    }
};



// Afegir l'efecte de girar la carta al fer click a sobre
function flip_card_fx() {
    const flip_cards = document.querySelectorAll('.flip-card');
    var flipped_card_val = new Object();
    
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
};



// Comprovar si ja hi ha 2 cartes girades per començar el combat
var flipped_cards_index = 0;
var flipped_cards_array = new Array();

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
};