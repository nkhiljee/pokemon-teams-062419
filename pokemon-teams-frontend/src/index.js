    
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function renderTrainer(trainer) {
    const main = document.querySelector("main")
    const div = document.createElement("div")

    div.className = "card"
    div.setAttribute('data-id', trainer.id)
    const p = document.createElement("p")
        p.innerText = trainer.name

    const button = document.createElement("button")

        button.setAttribute('data-id', trainer.id)
        button.innerText = "Add Pokemon"
        button.addEventListener('click', (event) => {
            fetch("http://localhost:3000/pokemons", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: trainer.id

                })
                
            })
            .then(res => res.json())
            .then(newPoke => {
                const newLi = document.createElement("li")
                newLi.innerText = `${newPoke.nickname} (${newPoke.species})`
                ul.append(newLi)

                const newbttnRelease = document.createElement('button')
                newbttnRelease.className = "release"
                newbttnRelease.innerText = "Release"
                newbttnRelease.setAttribute('data-pokemon-id', newPoke.id)

                newLi.append(newbttnRelease)
                ul.append(newLi)
                
            })
        })

    const ul = document.createElement('ul')
        trainer.pokemons.forEach(pokemon =>{
            const li = document.createElement('li')
                li.innerText = `${pokemon.nickname} (${pokemon.species})`
            const bttnRelease = document.createElement('button')
                bttnRelease.className = "release"
                bttnRelease.innerText = "Release"
                bttnRelease.setAttribute('data-pokemon-id', pokemon.id)
            bttnRelease.addEventListener("click", (event) => {
                // event.preventDefault()
                fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
                    method: "DELETE"
                  })
                  .then(() => {
                    li.remove()
                  })
            })
            ul.append(li)
            li.append(bttnRelease)
        })
    main.append(div)
    div.append(p, button, ul)
}

document.addEventListener('DOMContentLoaded', ()=> { 

    fetch("http://localhost:3000/trainers")
    .then(res => res.json())
    .then(trainers => {
    trainers.forEach(trainer => renderTrainer(trainer) )
    })
    
})
 