if (!localStorage.getItem('userEmail') || !localStorage.getItem('userPassword')) {
  window.location.href = 'login.html';
}

const container = document.getElementById('favorite-container');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

if (favorites.length === 0) {
  container.innerHTML = `<div class="farafavorite"><p>Nu ai melodii favorite salvate încă.</p></div>`;
} else {
  favorites.forEach((videoId) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    iframe.setAttribute('allowfullscreen', '');

    const btn = document.createElement('button');
    btn.textContent = "Șterge din favorite";
    btn.classList.add("favorite");
    btn.addEventListener("click", () => {
      removeFromFavorites(videoId);
      card.remove();
    });

    card.appendChild(iframe);
    card.appendChild(btn);
    container.appendChild(card);
  });
}

function removeFromFavorites(id) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  favs = favs.filter(video => video !== id);
  localStorage.setItem('favorites', JSON.stringify(favs));
  if (favs.length === 0) {
    container.innerHTML = `<div class="farafavorite"><p>Nu ai melodii favorite salvate încă.</p></div>`;
  }
}
