import { useState, useEffect } from "react";

const localCache = {};

const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
  }, [animal]);
  const requestBreedList = async () => {
    setBreedList([]);
    setStatus("loading");
    try {
      const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
      }
      const json = await response.json();
      const breedList = json.breeds;
      localCache[animal] = breedList || [];
      setBreedList(breedList);
      setStatus("loaded");
    } catch (error) {
      console.error(error);
    }
  };
  return [breedList, status];
};

export default useBreedList;
