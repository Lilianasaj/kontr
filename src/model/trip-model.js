class TripModel {
    constructor() {
        this.trips = [];
        this.listeners = [];
        this._isInitialized = false; 
    }

    loadMockData(mockData) {
        if (this.trips.length === 0 && !this._isInitialized) {
            this.trips = [...mockData];
            this._isInitialized = true;
            this.notifyListeners();
        }
    }

    addTrip(tripData) {
        if (!tripData.destination || !tripData.date) {
            throw new Error('Необходимо указать направление и дату поездки');
        }

        const newTrip = {
            ...tripData,
            id: Date.now()
        };
        
        this.trips.push(newTrip);
        this.notifyListeners();
        return newTrip;
    }

    deleteTrip(id) {
        const initialLength = this.trips.length;
        this.trips = this.trips.filter(trip => trip.id !== id);
        
        if (this.trips.length === initialLength) {
            throw new Error('Поездка с указанным ID не найдена');
        }
        
        this.notifyListeners();
    }

    updateTrip(updatedTrip) {
        const index = this.trips.findIndex(trip => trip.id === updatedTrip.id);
        if (index === -1) {
            throw new Error('Поездка для обновления не найдена');
        }

        this.trips[index] = updatedTrip;
        this.notifyListeners();
    }

    getFilteredTrips(dateFilter = null, completedOnly = false) {
        return this.trips.filter(trip => {
            const matchesDate = !dateFilter || trip.date === dateFilter;
            const matchesStatus = !completedOnly || trip.status === "Completed";
            return matchesDate && matchesStatus;
        });
    }

    getFilteredTripsByDateRange(startDate, endDate, statusFilter = 'all') {
        return this.trips.filter(trip => {
            const tripDate = new Date(trip.date);
            const matchesDate = this._dateInRange(tripDate, startDate, endDate);
            const matchesStatus = this._matchesStatusFilter(trip.status, statusFilter);
            return matchesDate && matchesStatus;
        });
    }

    _dateInRange(tripDate, startDate, endDate) {
        if (!startDate && !endDate) {
            return true;
        }
        
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        
        if (start && end) {
            return tripDate >= start && tripDate <= end;
        } else if (start) {
            return tripDate >= start;
        } else if (end) {
            return tripDate <= end;
        }
        
        return true;
    }

    _matchesStatusFilter(tripStatus, statusFilter) {
        switch (statusFilter) {
            case 'planned':
                return tripStatus === 'Planned';
            case 'completed':
                return tripStatus === 'Completed';
            case 'all':
            default:
                return true;
        }
    }

    getTripById(id) {
        return this.trips.find(trip => trip.id === id);
    }

    getAllTrips() {
        return [...this.trips];
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => {
            try {
                listener(this.trips);
            } catch (error) {
                console.error('Error in model listener:', error);
            }
        });
    }
}

export default TripModel;