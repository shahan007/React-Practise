import { useState, useEffect } from "react";
import Result from "./ResultPets";
import useBreedList from "./useBreedList";
import Loader from "./loader";

const ANIMALS = ["bird", "dog", "cat", "rabit", "reptile"];

const SeachParams = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Seattle .WA");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breedList] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);

  const requestPets = async () => {
    try {
      const response = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );
      if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
      }
      const json = await response.json();
      setPets(json.pets);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="search-params">
      <form
        method="GET"
        action=""
        onSubmit={(e) => {
          setLoading(true);
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="Location"
        />
        <label htmlFor="animal">Animal</label>
        <select
          name="animal"
          id="animal"
          value={animal}
          onChange={(e) => setAnimal(e.currentTarget.value)}
          onBlur={(e) => setAnimal(e.currentTarget.value)}
        >
          <option />
          {ANIMALS.map((animal) => (
            <option value={animal} key={animal}>
              {animal}
            </option>
          ))}
        </select>
        <label htmlFor="breed">Breed</label>
        <select
          name="breed"
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.currentTarget.value)}
          onBlur={(e) => setBreed(e.currentTarget.value)}
        >
          <option />
          {breedList.map((breed) => (
            <option value={breed} key={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
      <Result pets={pets} />,
    </div>
  );
};

export default SeachParams;
