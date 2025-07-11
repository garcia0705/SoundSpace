if (!localStorage.getItem('userEmail') || !localStorage.getItem('userPassword')) {
    window.location.href = 'login.html';
}


document.querySelectorAll('.play').forEach((button) => {
    button.addEventListener('click', () => {
        const playlist = button.closest('.categorie').querySelectorAll('iframe');
        let current = 0;

        playlist.forEach((frame) => {
            const origin = new URL(frame.src).origin;
            frame.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', origin);
        });

        const playNext = () => {
            if (current < playlist.length) {
                const iframe = playlist[current];
                const origin = new URL(iframe.src).origin;
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', origin);
                current++;
                setTimeout(playNext, 60000);
            }
        };

        playNext();
    });
});

function isInFavorites(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(id);
}

function toggleFavorite(id, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
        button.textContent = 'Adaugă la favorite';
    } else {
        favorites.push(id);
        button.textContent = 'Șterge din favorite';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

document.querySelectorAll('.favorite').forEach((button) => {
    const iframe = button.closest('.card').querySelector('iframe');
    const src = iframe.getAttribute('src');
    const videoId = src.split('/embed/')[1]?.split('?')[0];
    if (isInFavorites(videoId)) {
        button.textContent = 'Șterge din favorite';
    } else {
        button.textContent = 'Adaugă la favorite';
    }

    button.addEventListener('click', () => {
        toggleFavorite(videoId, button);
    });
});
