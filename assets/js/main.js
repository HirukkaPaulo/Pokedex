
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
let limit = 10
let offset = 0;
let qtdRecordsWithNexPage = 10
let newLimit = maxRecords - offset

function convertPokemonToLi(pokemon){
    return `          
                <li onclick=pokemonDetails(${pokemon.id}) class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>   
    `
}

function pokemonDetails(pokemonId){
    pokeApi.getPokemonDetail2(pokemonId).then((pokemons) => {
        const newHtml =
            `<div >
                <button class="backButton" onclick=backToMain(0,10)>Voltar</button>
                <div class="${pokemons.type} container">
                    <li class="pokemonDetails">          
                        <div class="title"> 
                            <h1>${pokemons.name}</h1>                           
                            <ol class="types">
                                ${pokemons.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemons.photo}" alt="${pokemons.name}">               
                        </div>
                        
                            <span class="numberDetails">#${pokemons.number}</span>           
                    </li>
                    
                    <div class='informations'>
                        <div class='pokemonInformationsTab'>
                            <p>About</p>
                            <p>Base Status</p>
                            <p>Evolution</p>
                            <p>Moves</p>                 
                        </div>
                        <p>Height:<span>${pokemons.height} cm.</span></p>  
                        <p>Weight:<span>${pokemons.weight} hg.</span></p> 
                        <div class='moves'>
                            <p>Moves:${pokemons.abilities.map((ability) => `<span><l1>${ability}</l1></span>`).join('')}</p>         
                        </div> 
                        <p>Base Experience:<span>${pokemons.baseExperience} xp.</span></p>
                    </div>
                </div>
            </div>
        `
        pokemonList.innerHTML = newHtml
        loadMoreButton.style.display = 'none'
     })
}  

function backToMain(pokeId, numPoke) {
    pokeApi.getPokemons(pokeId, numPoke).then((pokemons = []) => {
        offset = 0
        limit = 10
        newLimit = 151
        qtdRecordsWithNexPage = 0
        const newHtml =pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
        loadMoreButton.style.display = 'block'
       })}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
       })}

loadMoreButton.addEventListener('click', () =>{
    
    offset += limit
    qtdRecordsWithNexPage = offset + limit
    if (qtdRecordsWithNexPage >= maxRecords) {
        newLimit = maxRecords - offset
        pokemonList.innerHTML += loadPokemonItens(offset, newLimit)
        console.log(newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
        newLimit = maxRecords - offset
        console.log(newLimit)
    }
     
})

loadPokemonItens(offset, limit)
