let categoryUrl = null;
const parent = document.querySelector('.people .data');
let currentCategory = 'people'


document.querySelectorAll('#button').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault()
        currentCategory = link.dataset.category;
        categoryUrl = `https://swapi.dev/api/${currentCategory}`;
        parent.innerHTML = "";
        loadPeople();
    });
})

document.querySelector('.load-more').addEventListener('click', () => {
    loadPeople();
});

function loadPeople() {
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            categoryUrl = data.next;
            if (data.next) {
                document.querySelector('.people').classList.remove('hidden')
            } else {
                document.querySelector('.load-more').classList.add('hidden')
            }
            showPeople(data.results)
        })
}

/**
 * 
 * @param {Array[]} data
 */

function showPeople(data) {

    data.forEach(object => {
        const element = document.createElement('div');
        element.addEventListener("click", () => fetchFullDetailsFromApp(object.url));
        if (currentCategory === 'people') {
            element.innerHTML = `
            <p>Name: ${object.name} | Height: ${object.height} | Mass: ${object.mass} | Birth Year: ${object.birth_year}</p>
            `
        } else if (currentCategory === "planets") {
            element.innerHTML = `
            <p>Name: ${object.name} | Rotation: ${object.rotation_period} | Climate: ${object.climate} | Terrain: ${object.terrain}</p>
            `
        } else if (currentCategory === "vehicles") {
            element.innerHTML = `
            <p>Name: ${object.name} | Model: ${object.model} | Price: ${object.cost_in_credits} | Max speed: ${object.max_atmosphering_speed}</p>
            `
        }
        parent.appendChild(element);
    })
}

function fetchFullDetailsFromApp(url) {
    fetch(url)
        .then(response => response.json())
        .then(object => showFullDetails(object))
        .catch(error => console.error("Error fetching full details:", error));
}

function showFullDetails(object) {
    const content = document.querySelector('.people .data');
    document.querySelector('.load-more').classList.add('hidden')
    content.innerHTML = `
        <h3>${object.name}</h3>
        <ul>
            ${Object.entries(object)
                .filter(([key, value]) => typeof value === "string" || typeof value === "number")
                .map(([key, value]) => `<li><strong>${key.replace(/_/g, " ")}:</strong> ${value}</li>`)
                .join("")}
                
        </ul>
    `;
}