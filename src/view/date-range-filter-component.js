import AbstractComponent from '../framework/view/abstract-component.js';

class DateRangeFilterComponent extends AbstractComponent {
    constructor() {
        super();
        this._filterChangeHandler = null;
        this._autoApply = false; 
    }

    getTemplate() {
        return `
            <div class="date-range-filter">
                <h3>Фильтр поездок</h3>
                
                <div class="filter-group">
                    <label for="start-date">Начальная дата:</label>
                    <input type="date" id="start-date" />
                </div>
                
                <div class="filter-group">
                    <label for="end-date">Конечная дата:</label>
                    <input type="date" id="end-date" />
                </div>
                
                <div class="filter-group">
                    <label for="status-filter">Статус:</label>
                    <select id="status-filter">
                        <option value="all">Все поездки</option>
                        <option value="planned">Только запланированные</option>
                        <option value="completed">Только выполненные</option>
                    </select>
                </div>
                
                <div class="filter-actions">
                    <button type="button" class="apply-filter-btn">Применить фильтр</button>
                    <button type="button" class="reset-filter-btn">Сбросить фильтр</button>
                </div>
                
                <div class="filter-info">
                    <small>Нажмите "Применить фильтр" для обновления списка</small>
                </div>
            </div>
        `;
    }

    setFilterChangeHandler(handler) {
        this._filterChangeHandler = handler;
        
        const applyBtn = this.getElement().querySelector('.apply-filter-btn');
        const resetBtn = this.getElement().querySelector('.reset-filter-btn');
              
        applyBtn.addEventListener('click', () => {
            if (this._filterChangeHandler) {
                this._filterChangeHandler(this.getFilterValues());
            }
        });
        
        resetBtn.addEventListener('click', () => {
            this.resetFilters();
            if (this._filterChangeHandler) {
                this._filterChangeHandler(this.getFilterValues());
            }
        });
        
   
    }

    getFilterValues() {
        const startDate = this.getElement().querySelector('#start-date').value;
        const endDate = this.getElement().querySelector('#end-date').value;
        const status = this.getElement().querySelector('#status-filter').value;
        
        return {
            startDate: startDate || null,
            endDate: endDate || null,
            status: status
        };
    }

    resetFilters() {
        this.getElement().querySelector('#start-date').value = '';
        this.getElement().querySelector('#end-date').value = '';
        this.getElement().querySelector('#status-filter').value = 'all';
    }
}

export default DateRangeFilterComponent;