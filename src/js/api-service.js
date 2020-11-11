export default class ApiService{
    constructor() {    
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '19044793-8d0b89c981ce143090a5b157d';
        
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(r => r.json())
            .then(data => {
                this.incrementPage();    
                return data.hits;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}
