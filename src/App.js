import "./App.css";
import { useState } from "react";

import { Card, Input, Button } from "antd";
const { Meta } = Card;

const KEY_API = "15c2f7dd6c41229cb3a08888a10b257d";

const App = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [input, setInput] = useState("");
  const URL_API = `https://api.themoviedb.org/3/search/tv?api_key=${KEY_API}&language=pt-BR&query=${input}`;

  const getSeries = () => {
    if (input) {
      fetch(URL_API)
        .then((response) => response.json())
        .then((body) => setSeriesList(body.results));
    }
  };

  return (
    <div className="App">
      <div>
        <Input
          style={{ width: 200, marginBottom: 30, marginTop: 30 }}
          placeholder="Ex. Dark"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="primary" onClick={getSeries}>
          Pesquisar Série
        </Button>
      </div>

      {seriesList.map((series, index) => (
        <Card
          key={index}
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt={series.name}
              src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
            />
          }
        >
          <Meta
            title={series.name}
            description={`${series.vote_average * 10}%`}
          />
        </Card>
      ))}
    </div>
  );
};

export default App;
