import { useState } from "react";

export function Pokedex() {
  const [nombre, setNombre] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const buscarPokemon = async () => {
    try {
      setError("");
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);

      if (!respuesta.ok) {
        throw new Error("Pokemon no encontrado");
      }

      const datos = await respuesta.json();

      setPokemon({
        nombre: datos.name,
        imagen: datos.sprites.front_default, 
      });
    } catch (error) {
      setPokemon(null);
      setError(error.message); 
    }
  };
   

return (
  <div style={{ textAlign: "center", marginTop: "2rem" }}>
    <h1>Pokedex</h1>

    <input
      type="text"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      placeholder="Pikachu"
      style={{ padding: "0.5rem", marginRight: "0.5rem" }}
    />

    <button onClick={buscarPokemon}>Buscar</button>

    {error && (
      <p style={{ color: "red" }}>
        {error}
      </p>
    )}
    {pokemon && (
  <div>
    <h2>{pokemon.nombre}</h2>
    <img src={pokemon.imagen} alt={pokemon.nombre} />
  </div>
)}
  </div>
);

}
