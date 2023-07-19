import { FormEvent, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { Animal } from "./APIResponsesTypes";
import { RequestParams } from "./SearchParams";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

interface SearchFormProps {
  animal: string;
  breeds: string[];
  setAnimal: (animal: Animal) => void;
  setRequestParams: (params: RequestParams) => void;
}

export default function SearchForm({
  animal,
  breeds,
  setAnimal,
  setRequestParams,
}: SearchFormProps) {
  const [adoptedPet] = useContext(AdoptedPetContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj = {
      animal: (formData.get("animal")?.toString() ?? "") as Animal,
      breed: formData.get("breed")?.toString() ?? "",
      location: formData.get("location")?.toString() ?? "",
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
            setAnimal(e.target.value as Animal);
          }}
          onBlur={(e) => {
            setAnimal(e.target.value as Animal);
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
