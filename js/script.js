const pokemonName = document.querySelector(".poke_name")
const pokemonID   = document.querySelector(".poke_id")
const pokemonImage = document.querySelector(".pokemon")
const formPoke = document.querySelector(".form")
const input = document.querySelector(".input")
const btn1 = document.querySelector(".poke_prev")
const btn2 = document.querySelector(".poke_aft")

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
   
    if (APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ...'
    pokemonID.innerHTML = ''
    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonID.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id;
    }
    else{
        pokemonName.innerHTML = 'Not found :c'
        pokemonID.innerHTML = ''
        pokemonImage.style.display = 'none'
        input.value = ''
    }


}

formPoke.addEventListener('submit',(event)=>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
    

})

btn1.addEventListener('click',()=>{
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

btn2.addEventListener('click',() => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon('1')

