import Pet from "./pet";

const Result = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            id={pet.id}
            images={pet.images}
            location={`${pet.city},${pet.city}`}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Result;
