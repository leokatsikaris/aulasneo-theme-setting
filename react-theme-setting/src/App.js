import './App.css';
import { useState } from 'react';
import { API, graphqlOperation} from 'aws-amplify';
import { createSite} from './graphql/mutations';
import { listSites } from './graphql/queries';
import {withAuthenticator, Button, Heading} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
 
function App({signOut, user}) {

  let resultPrevHomeSettings = null;

  console.log('usuario', user);

  const themes = ["Dark", "Light", "Warm", "Cold"];

  const [themeSelected, setThemeSelected] = useState('');
 
  const [inputState, setInputState] = useState({
    username: user?.username ? user?.username : '',
    theme: "",
  })


  const handleChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result =  await API.graphql(graphqlOperation(createSite, {input: inputState}));;
    console.log('se han guardado datos', result);
  };

  const handleThemeChange = (e) => {
    setThemeSelected(e.target.value);
  }


  return (
    <div className="App">
      <Heading>Hello {user.username}</Heading>
      <form onSubmit={handleSubmit}>
        <select onChange={handleThemeChange}>
          {themes.map((t) => {
            return (
              <option value={t}>{t}</option>
            )
          })}
        </select>
        <button>
          Submit
        </button>
      </form>
      <br />
      <Button onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
}

export default withAuthenticator(App);
