const API_ORIGIN = "https://6afcab10892984c4494bd9fb.mockapi.io"; //https://6afcab10892984c4494bd9fb.mockapi.io/Soundboard
const API_URL = `${API_ORIGIN}`;

let all_soundboards = [];

async function fetchClubs() {
  const response = await fetch(`${API_URL}/Soundboard`);
  all_soundboards = await response.json();
  console.log(all_soundboards);

  for(let soundboard of all_soundboards){
      document.getElementById("page-title").innerHTML +=
    //   Card populated by API data
      `<div class='club_card' data-id='${soundboard['id']}'>
        <h3>${soundboard['createdAt']}</h3>
        <h3>${soundboard['name']}</h3>
        <p>${soundboard['Buttons']}</p>
        <a class='card_edit_button' href='edit_club.html?id=${club['id']}'>Edit</a>
      </div>`
  }

  // The add card always goes last
  document.getElementById('clubs').innerHTML +=
    `<a href='new_club.html' class='club_card add_card' aria-label='Create a new club'>
      <span class='plus'>+</span>
      <span class='add_label'>Add a new club</span>
    </a>`
}

// Clicking a card opens its club page; the Edit button keeps its own link
document.getElementById('clubs').addEventListener('click', (event) => {
  const card = event.target.closest('.club_card[data-id]');
  if (!card || event.target.closest('.card_edit_button')) return;
  window.location.href = `club.html?id=${card.dataset.id}`;
});

window.addEventListener("load", fetchClubs);

