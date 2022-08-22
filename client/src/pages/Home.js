import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useUser } from '../context/UserContext';
import reducer from '../context/reducers';
import { LOGIN } from '../context/actions';

const Home = () => {
  const initialState = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  const logout = (event) => {
    event.preventDefault();

    Auth.logout(dispatch);
  }



  const { data: dataMe } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });

  const me = dataMe?.me || {};

  useEffect(() => {
    if (me && me.hasOwnProperty("_id")) {
      if (state.user === null || me._id !== state.user._id) {
        dispatch({ type: LOGIN, payload: me });
      }
    }
  }); // want to update state on any change

  //   <html>
  //     <head>
  //       <meta charSet='utf-8'></meta>
  //       <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
  //       <title>Ruff Life</title>

  //       <nav class="navbar navbar-expand-lg bg-light">
  //   <div class="container-fluid">
  //     <a class="navbar-brand" href="#">Navbar</a>
  //     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
  //       <span class="navbar-toggler-icon"></span>
  //     </button>
  //     <div class="collapse navbar-collapse" id="navbarNavDropdown">
  //       <ul class="navbar-nav">
  //         <li class="nav-item">
  //           <a class="nav-link active" aria-current="page" href="#">Home</a>
  //         </li>
  //         <li class="nav-item">
  //           <a class="nav-link" href="#">Adopt</a>
  //         </li>
  //         <li class="nav-item">
  //           <a class="nav-link" href="#">Pet Services</a>
  //         </li>
  //        <li class="nav-item">
  // //         <a class="nav-link" href="#">Charitable Donations</a>
  // //         </li>
  //         <li class="nav-item">
  // // //       <a class="nav-link" href="#">Contact Us</a>
  // // //       </li>
  //         <li class="nav-item dropdown">
  //           <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  //             Dropdown link
  //           </a>
  //           <ul class="dropdown-menu">
  //             <li><a class="dropdown-item" href="#">Who We Are</a></li>
  //             <li><a class="dropdown-item" href="#">Support Us</a></li>
  //             <li><a class="dropdown-item" href="#">Free Resources</a></li>
  //           </ul>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // </nav>

  //     </head>
  //     <body>
  //     <h1>Welcome to Ruff Life Adoption Center!</h1>
  //     <meta name="description" content="We offer life-affirming rescue, treatment, protection and placement of companion animals that forever upholds the critical importance of the human-animal bond."></meta>
  //       <img alt="https://www.animalsangels.org/sites/animalsangels.org/files/images/pups%20in%20cages_logo.jpg" width="200"></img>

  //     </body>

  //   </html>

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to Ruff Life Adoption Center!</h1>
        {/* <Link to="/login">{ state.logged_in ? "Profile" : "Login" }</Link><br /> */}
        <a href="/logout" onClick={logout}>Logout</a><br />
        {/* { state.logged_in ? (
          <></>
        ) : ( */}
        <>
          <Link to="/signup">Sign Up</Link>
          <br />
        </>
        {/* )} */}

      </div>
    </div>

  );
};

export default Home;
