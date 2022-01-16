// import React from "react";
import Pet from "./pet";
import SeachParams from "./SearchParams";
import SearchParams from "./SearchParams";

// const App = () => {
//     return React.createElement("div", {}, [
//         React.createElement("h1", {}, "Adopt Me"),
//         React.createElement(Pet, { name: "Izzy", animal: "Dawg", age: 30 }),
//         React.createElement(Pet, { name: "Romero", animal: "Neck", age: 41 }),
//         React.createElement(Pet, { name: "Khabib", animal: "Eagle", age: 33 }),
//         ...[1, 2, 3].map((i) => React.createElement("h5", {}, i)),
//     ]);
// };

const App = () => {
  return (
    <div>
      <h1>Adopt me</h1>
      <SeachParams />
    </div>
  );
};

export default App;
