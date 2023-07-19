import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 1337,
    name: "Ryuu",
    animal: "dog",
    description: "Lorem ipsum",
    breed: "Shikoku",
    images: [],
    city: "San Francisco",
    state: "CA",
  },
  () => {},
]);

export default AdoptedPetContext;
