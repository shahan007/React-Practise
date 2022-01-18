import { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Loader from "./loader";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";

class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState({ ...{ loading: false }, ...json.pets[0] });
  }
  
  render() {    
    const loading = this.state.loading;
    if (loading) {
      return <Loader />;
    }

    const { animal, breed, city, state, description, name, images } = this.state;

      return (
      <Fragment>
        <div className="details">
          <Carousel images={images} />
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
            <button>Adopt {name}</button>
            <p>{description}</p>
          </div>
        </div>
        <Link to="/">Go Back</Link>
      </Fragment>
    );
  }
}

const DetailsWithRouter = withRouter(Details);
export default function DetailsWithErrorBoundary(){
  return (
    <ErrorBoundary>
      <DetailsWithRouter/>
    </ErrorBoundary>
  )
}