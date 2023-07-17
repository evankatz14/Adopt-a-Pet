import Pet from "./Pet";

export default function Results({ pets }) {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            breed={pet.breed}
            id={pet.id}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            name={pet.name}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
}
