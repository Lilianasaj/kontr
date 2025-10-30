import EditPresenter from './edit-presenter.js';

class TripPresenter {
    constructor(tripListComponent, filterComponent, tripModel) {
        this._tripListComponent = tripListComponent;
        this._filterComponent = filterComponent;
        this._tripModel = tripModel;
        this._editPresenter = new EditPresenter(tripModel);
        
        this._currentFilters = {
            startDate: null,
            endDate: null,
            status: 'all'
        };

        this._tripModel.addListener(this._handleModelChange.bind(this));
        this._filterComponent.setFilterChangeHandler(this._handleFilterChange.bind(this));

        this._renderTrips();
    }

    _handleModelChange() {
        this._renderTrips();
    }

    _handleFilterChange(filters) {
        this._currentFilters = filters;
        this._renderTrips();
    }

    _renderTrips() {
        const filteredTrips = this._tripModel.getFilteredTripsByDateRange(
            this._currentFilters.startDate,
            this._currentFilters.endDate,
            this._currentFilters.status
        );
        
        this._tripListComponent.renderTrips(
            filteredTrips,
            this._handleDeleteTrip.bind(this),
            this._handleEditTrip.bind(this)
        );
    }

    _handleDeleteTrip(tripId) {
        if (confirm('Вы уверены, что хотите удалить эту поездку?')) {
            try {
                this._tripModel.deleteTrip(tripId);
            } catch (error) {
                alert('Ошибка при удалении поездки: ' + error.message);
            }
        }
    }

    _handleEditTrip(trip) {
        const container = document.querySelector('.container');
        this._editPresenter.openEditForm(trip, container);
    }
}

export default TripPresenter;