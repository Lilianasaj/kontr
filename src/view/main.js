import TripModel from '../model/trip-model.js';
import TripFormComponent from './trip-form-component.js';
import TripListComponent from './trip-list-component.js';
import DateRangeFilterComponent from './date-range-filter-component.js';
import FormPresenter from '../presenter/form-presenter.js';
import TripPresenter from '../presenter/trip-presenter.js';
import mockTrips from '../mock/trips.js';

class TripPlannerApp {
    constructor() {
        this._tripModel = new TripModel();
        this._initializeComponents();
        this._initializePresenters();
        this._loadMockData();
    }

    _initializeComponents() {
        this._tripFormComponent = new TripFormComponent();
        this._tripListComponent = new TripListComponent();
        this._filterComponent = new DateRangeFilterComponent(); // Используем новый фильтр
    }

    _initializePresenters() {
        this._formPresenter = new FormPresenter(this._tripFormComponent, this._tripModel);
        this._tripPresenter = new TripPresenter(
            this._tripListComponent,
            this._filterComponent,
            this._tripModel
        );
    }

    _loadMockData() {
        this._tripModel.loadMockData(mockTrips);
    }

    render() {
        const container = document.querySelector('.container');
        
        container.innerHTML = '<h1>Планер поездок</h1>';
        
        container.appendChild(this._tripFormComponent.getElement());
        container.appendChild(this._filterComponent.getElement());
        container.appendChild(this._tripListComponent.getElement());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new TripPlannerApp();
    app.render();
});