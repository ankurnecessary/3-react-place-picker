import React from 'react';
import {useEffect, useRef, useState, useCallback} from 'react';

import Places from './components/Places.jsx';
import {AVAILABLE_PLACES} from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js';

/**
 * @return {jsx.Element}
 */
function App() {
  const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  const storedPlaces = storedIds.map((id) => {
    return AVAILABLE_PLACES.find((place) => place.id === id);
  });
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          const sortedPlaces = sortPlacesByDistance(
              AVAILABLE_PLACES,
              latitude,
              longitude,
          );
          setAvailablePlaces(sortedPlaces);
        },
    );
  }, []);

  /**
   * @param {string} id
   */
  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  /**
   * To stop removing place
   * @return {void}
   */
  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  /**
   * To handle price selection
   * @param {string} id
   */
  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
          'selectedPlaces',
          JSON.stringify([id, ...storedIds]),
      );
    }
  }

  /**
   * To remove a selected place
   */
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current),
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const indexToRemove = storedIds.indexOf(selectedPlace.current);
    if (indexToRemove !== -1) {
      storedIds.splice(indexToRemove, 1);
      localStorage.setItem('selectedPlaces', JSON.stringify(storedIds));
    }
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places as per the proximity from your location."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
