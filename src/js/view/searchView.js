class SearchView {
    #parentEl = document.querySelector('.search');

    getSearchedItem() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    #clearInput() {
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler_function) {
        this.#parentEl.addEventListener('submit', function (e) {
            e.preventDefault()
            handler_function();
        })
    }
}

export default new SearchView;