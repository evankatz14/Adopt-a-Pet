import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Results from "./Results";
import SearchForm from "./SearchForm";
import fetchSearch from "./fetchSearch";
import useBreedsList from "./useBreedsList";

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedsList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results?.data?.pets ?? [];

  // useEffect(() => {
  //   requestPets();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  //   );
  //   const json = await res.json();

  //   setPets(json.pets);
  // }

  return (
    <div className="search-params">
      <SearchForm
        animal={animal}
        breeds={breeds}
        setAnimal={setAnimal}
        setRequestParams={setRequestParams}
      />
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
