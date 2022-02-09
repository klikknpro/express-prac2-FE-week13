import React, { useState, useEffect } from "react";
import http from "axios"; // Balint trukkos elnevezese, hmmmm.....

function App() {
  const [title, setTitle] = useState("");
  const [characters, setCharacters] = useState("");
  const [series, setSeries] = useState([]);

  const createShow = async () => {
    await http.post("http://localhost:3000/api/series", {
      title: title,
      characters: characters.split(","),
    });
    load();
    setTitle("");
    setCharacters("");
  };

  const deleteShow = () => {};

  const load = async () => {
    const response = await http.get("http://localhost:3000/api/series");
    setSeries(response.data);
  };

  useEffect(() => {
    load();
  }, []);
  // useeffect ide megy szepen kozvetlen a return ele ;)
  return (
    <div className="App">
      <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea placeholder="characters" value={characters} onChange={(e) => setCharacters(e.target.value)}></textarea>
      <button onClick={createShow}>Create</button>
      {series.map((show) => (
        <div key={show.id}>
          <p>{show.title}</p>
          <ul>
            Characters
            {show.characters.map((char) => (
              <li key={char}>{char}</li>
            ))}
          </ul>
          <button onClick={deleteShow}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;

/*
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
*/
