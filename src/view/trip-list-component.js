import AbstractComponent from '../framework/view/abstract-component.js';
import TripItemComponent from './trip-item-component.js';

class TripListComponent extends AbstractComponent {
    constructor() {
        super();
    }

    getTemplate() {
        return `
            <div class="trip-list">
                <h2>Поездки</h2>
                <ul id="trip-list"></ul>
            </div>
        `;
    }

    renderTrips(trips, onDelete, onEdit) {
        const listElement = this.getElement().querySelector('#trip-list');
        listElement.innerHTML = '';

        trips.forEach(trip => {
            const tripItem = new TripItemComponent(trip);
            const tripElement = tripItem.getElement();
            
            tripItem.setDeleteHandler(() => onDelete(trip.id));
            tripItem.setEditHandler(() => onEdit(trip));
            
            listElement.appendChild(tripElement);
        });
    }
}

export default TripListComponent;