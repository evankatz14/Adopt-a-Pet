import { useQuery } from "@tanstack/react-query";
import { lazy, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PetAPIResponse } from "./APIResponsesTypes";
import AdoptedPetContext from "./AdoptedPetContext";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    throw new Error("why didn't you provide me with an id???");
  }
  const results = useQuery(["details", id], fetchPet);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const [showModal, setShowModal] = useState(false);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🦊</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];
  if (!pet) {
    throw new Error("no pet, lol");
  }

  const adoptPet = () => {
    setAdoptedPet(pet);
    navigate("/");
  };

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} — {pet.breed} — {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button onClick={adoptPet}>Yes</button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
