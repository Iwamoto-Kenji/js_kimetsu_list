// API URLを動的に構築する
const baseUrl = "https://ihatov08.github.io/kimetsu_api/api/";
const radioButtons = document.querySelectorAll('input[type=radio]');
const selectedList = document.getElementById('selected-list');
const loader = document.getElementById('loader');

let selectedFilter = "all";

function constructApiUrl(selectedFilter) {
  return baseUrl + selectedFilter + ".json";
}

async function fetchData() {
  loader.style.display = "block";
  selectedList.innerHTML = "";

  try {
    const apiUrl = constructApiUrl(selectedFilter);
    const response = await fetch(apiUrl);
    const data = await response.json();

    loader.style.display = "none";
    data.forEach(kimetsu => {
      const kimetsuItem = document.createElement('div');
      kimetsuItem.classList.add('kimetsu-item');
      kimetsuItem.innerHTML = `
        <h2>${kimetsu.name}</h2>
        <img src="https://ihatov08.github.io/${kimetsu.image}" alt="${kimetsu.name}">
        <p>${kimetsu.category}</p>
      `;
      selectedList.appendChild(kimetsuItem);
    });
  } catch (error) {
    console.error("Error fetching data: " + error);
  }
}

radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', () => {
    selectedFilter = radioButton.value;
    fetchData();
  });
});

fetchData();
