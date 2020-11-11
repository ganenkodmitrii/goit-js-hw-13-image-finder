import getRefs from './get-refs.js'
import photoCardTmp from '../templates/photo-card.hbs';
import ApiService from './api-service.js';
import LoadMoreBtn from './load-more-btn';
    
const refs = getRefs();

const apiService = new ApiService();

const loadMoreBtn = new LoadMoreBtn({
    selector: 'load-more-btn',
    hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onFetchImages);

let currentCoord = 0;

function onSearch(e) {
    e.preventDefault();
    apiService.query = e.currentTarget.elements.query.value;

    if (apiService.query === '') {
        clearImageMurkupContainer();
        loadMoreBtn.hide();
        return;
    }

    apiService.resetPage();
    clearImageMurkupContainer();
    onFetchImages();
}


function onFetchImages() {
    loadMoreBtn.show();
    loadMoreBtn.disable();

    currentCoord = refs.galleryBox.offsetHeight;

    apiService.fetchImages().then(hits => {
        appendImageMurkup(hits);
        loadMoreBtn.enable();
        scrollingPage();
    });
}

function appendImageMurkup(hits) {
    refs.galleryBox.insertAdjacentHTML('beforeend', photoCardTmp(hits));
}

function clearImageMurkupContainer() {
    refs.galleryBox.innerHTML = '';
}

function scrollingPage() {
    window.scrollTo({
        top: currentCoord,
        left: 0,
        behavior: 'smooth',
    });
}