import Base from "../Components/Base";
import userContext from "../context/userContext";
const Services = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <h1>This is Services page</h1>
          <p>We are building blog website</p>
          <h1>Welcome user : {object.user.login && object.user.data.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default Services;
