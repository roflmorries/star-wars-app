let categoryUrl=null;const parent=document.querySelector(".people .data");let currentCategory="people";document.querySelectorAll("#button").forEach(a=>{a.addEventListener("click",async b=>{b.preventDefault(),currentCategory=a.dataset.category,categoryUrl=`https://swapi.dev/api/${currentCategory}`,parent.innerHTML="",document.querySelector(".load-more").classList.remove("hidden"),await loadPeople()})}),document.querySelector(".load-more").addEventListener("click",async()=>{await loadPeople()});async function loadPeople(){try{const a=await fetch(categoryUrl),b=await a.json();categoryUrl=b.next,b.next?document.querySelector(".people").classList.remove("hidden"):document.querySelector(".load-more").classList.add("hidden"),showPeople(b.results)}catch(a){console.error(`Loading people error: ${a}`)}}function showPeople(a){a.forEach(a=>{const b=document.createElement("div");b.addEventListener("click",()=>fetchFullDetailsFromApp(a.url)),"people"===currentCategory?b.innerHTML=`
            <p>Name: ${a.name} | Height: ${a.height} | Mass: ${a.mass} | Birth Year: ${a.birth_year}</p>
            `:"planets"===currentCategory?b.innerHTML=`
            <p>Name: ${a.name} | Rotation: ${a.rotation_period} | Climate: ${a.climate} | Terrain: ${a.terrain}</p>
            `:"vehicles"===currentCategory&&(b.innerHTML=`
            <p>Name: ${a.name} | Model: ${a.model} | Price: ${a.cost_in_credits} | Max speed: ${a.max_atmosphering_speed}</p>
            `),parent.appendChild(b)})}async function fetchFullDetailsFromApp(a){try{const b=await fetch(a),c=await b.json();showFullDetails(c)}catch(a){console.error(`Fetching error: ${a}`)}}function showFullDetails(a){const b=document.querySelector(".people .data");document.querySelector(".load-more").classList.add("hidden"),b.innerHTML=`
        <h3>${a.name}</h3>
        <ul>
            ${Object.entries(a).filter(([a,b])=>"string"==typeof b||"number"==typeof b).map(([a,b])=>`<li><strong>${a.replace(/_/g," ")}:</strong> ${b}</li>`).join("")}
                
        </ul>
    `}