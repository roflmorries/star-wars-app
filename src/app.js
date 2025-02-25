import '@css/style.css';
import '@css/background.css';
import '@img/nav_logo.png';

let categoryUrl = null;
const parent = document.querySelector('.people .data');
let currentCategory = 'people';

document.querySelectorAll('#button').forEach((link) => {
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    currentCategory = link.dataset.category;
    categoryUrl = `https://swapi.dev/api/${currentCategory}`;
    parent.innerHTML = '';
    document.querySelector('.load-more').classList.remove('hidden');
    await loadPeople();
  });
});

document.querySelector('.load-more').addEventListener('click', async () => {
  await loadPeople();
});

async function loadPeople() {
  try {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    categoryUrl = data.next;

    if (data.next) {
      document.querySelector('.people').classList.remove('hidden');
    } else {
      document.querySelector('.load-more').classList.add('hidden');
    }
    showPeople(data.results);
  } catch (error) {
    console.error(`Loading people error: ${error}`);
  }
}

/**
 *
 * @param {Array[]} data
 */

function showPeople(data) {
  data.forEach((object) => {
    const element = document.createElement('div');
    element.addEventListener('click', () => fetchFullDetailsFromApp(object.url));
    if (currentCategory === 'people') {
      element.innerHTML = `
            <p>Name: ${object.name} | Height: ${object.height} | Mass: ${object.mass} | Birth Year: ${object.birth_year}</p>
            `;
    } else if (currentCategory === 'planets') {
      element.innerHTML = `
            <p>Name: ${object.name} | Rotation: ${object.rotation_period} | Climate: ${object.climate} | Terrain: ${object.terrain}</p>
            `;
    } else if (currentCategory === 'vehicles') {
      element.innerHTML = `
            <p>Name: ${object.name} | Model: ${object.model} | Price: ${object.cost_in_credits} | Max speed: ${object.max_atmosphering_speed}</p>
            `;
    }
    parent.appendChild(element);
  });
}

async function fetchFullDetailsFromApp(url) {
  try {
    const response = await fetch(url);
    const object = await response.json();
    showFullDetails(object);
  } catch (error) {
    console.error(`Fetching error: ${error}`);
  }
}

function showFullDetails(object) {
  const content = document.querySelector('.people .data');
  document.querySelector('.load-more').classList.add('hidden');
  content.innerHTML = `
        <h3>${object.name}</h3>
        <ul>
            ${Object.entries(object)
    .filter(([key, value]) => typeof value === 'string' || typeof value === 'number')
    .map(([key, value]) => `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${value}</li>`)
    .join('')}
                
        </ul>
    `;
}
