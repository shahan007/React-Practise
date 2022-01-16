const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;
  let show_image = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    show_image = images[0];
  }
  return (
    <a href={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={show_image} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </a>
  );
};

export default Pet;
