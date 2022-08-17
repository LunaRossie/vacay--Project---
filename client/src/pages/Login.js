import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import LoginForm from '../components/LoginForm';
import {QUERY_ME} from '../utils/queries';
import { useEffect }from 'react';


const Login = (props => {
    console.log(props);
    const {appState, setAppState} = props;
    const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });

  const me = data?.me || {};

useEffect( () => {
  if(me && me.hasOwnProperty("_id")){
    if(appState.user === null || me.id !== appState.user._id ){
      setAppState({
        ...appState,
        user: {...me},
        logged_in: true
      });
    }
  }
});

return (
    <div className="card bg-white card-rounded w-50">
        <div className="card-header bg-dark text-center">
            <h1>login</h1>
        </div>
        <div className="card-body m-5">
        <h2>Here is a list of matchups you can vote on:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
                { me && me.hasOwnProperty("_id") ? (
                    <ul className="square">
                        {/*logged in */}
                            <li>{me.name} is logged in</li>
                            <li>email: {me.email}</li>
                    </ul>
                ) : (
                    <>{/*Not Logged in - need form*/}
                       <LoginForm appState={appState} setAppState={setAppState} />
                    </>
                )}
            </>
        )}
    </div>
</div>
);
};

