let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form')
  const toyCollection = document.querySelector('#toy-collection')
  function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => buildToy(toy)));
  }
  fetchToys()

  form.addEventListener('submit', (e) => submitForm(e))


  function buildToy(toy) {
    const div = document.createElement('div')
    const btn = document.createElement('button')
    div.id = toy.id
    div.className = 'card'
    div.innerHTML = 
    `
    <h2>${toy.name}</h2> 
    <img src=${toy.image} class="toy-avatar" />   
    <p>${toy.likes} </p
    `
    btn.textContent = "Like <3"
    btn.className = "like-btn"
    btn.addEventListener('click', () => updateLikes(toy))
    div.appendChild(btn)
    toyCollection.appendChild(div)
  }

  function updateLikes(toy) {
    toy.likes++
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(resp => resp.json())
    .then(updatedToy => {
      const oldToy = document.getElementById(toy.id)
      const btn = document.createElement('button')
      oldToy.innerHTML = 
      `
      <h2>${updatedToy.name}</h2>    
      <img src=${updatedToy.image} class="toy-avatar" />   
       <p>${updatedToy.likes} </p>
      `
      btn.textContent = "Like <3"
      btn.className = "like-button"
      btn.addEventListener('click', () => updateLikes(toy))
      oldToy.appendChild(btn)
    })

  }

  function submitForm(e) {
    e.preventDefault()
    let toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    postToy(toy)
  }

  function postToy(toy) {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(resp => resp.json())
    .then(toy => buildToy(toy))
  }
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});
