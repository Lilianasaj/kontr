import AbstractComponent from '../framework/view/abstract-component.js';

class FilterComponent extends AbstractComponent {
    constructor() {
        super();
        this._filterChangeHandler = null;
    }

    getTemplate() {
        return `
            <div class="trip-filter">
                <label for="date-filter">Фильтр по дате:</label>
                <input type="date" id="date-filter" />
                
                <label><input type="checkbox" id="completed-filter" /> Показывать только завершенные поездки</label>
            </div>
        `;
    }

    setFilterChangeHandler(handler) {
        this._filterChangeHandler = handler;
        
        const dateFilter = this.getElement().querySelector('#date-filter');
        const completedFilter = this.getElement().querySelector('#completed-filter');

        dateFilter.addEventListener('change', () => handler(this.getFilterValues()));
        completedFilter.addEventListener('change', () => handler(this.getFilterValues()));
    }

    getFilterValues() {
        return {
            date: this.getElement().querySelector('#date-filter').value || null,
            completedOnly: this.getElement().querySelector('#completed-filter').checked
        };
    }
}

export default FilterComponent;