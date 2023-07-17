import { useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export default function SearchForm({
  animal,
  breeds,
  setAnimal,
  setRequestParams,
}) {
  const [adoptedPet] = useContext(AdoptedPetContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? "",
    };

    setRequestParams(obj);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {adoptedPet ? (
        <div className="pet image-container">
          <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
        </div>
      ) : null}
      <label htmlFor="location">
        Location
        <input id="location" name="location" placeholder="Location" />
      </label>
      <label htmlFor="animal">
        Animal
        <select
          id="animal"
          name="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
        >
          <option />
          {ANIMALS.map((animal) => (
            <option key={animal}>{animal}</option>
          ))}
        </select>
      </label>
      <label htmlFor="breed">
        Breed
        <select id="breed" disabled={!breeds.length} name="breed">
          <option />
          {breeds.map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
      </label>
      <button>Submit</button>
    </form>
  );
}
