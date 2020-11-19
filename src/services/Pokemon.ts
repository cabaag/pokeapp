import Axios from 'axios';
import { API } from '../config/globals';
import { Pokemon, PokemonListResponse } from '../types/Pokemon';

export function retrievePokemon(name: string): Promise<Pokemon> {
  return Axios.get<Pokemon>(`${API}/pokemon/${name}`).then(({ data }) => data);
}

export async function retrievePokemons(
  limit: number,
  offset: number
): Promise<PokemonListResponse> {
  return Axios.get<PokemonListResponse>(
    `${API}/pokemon?limit=${limit}&offset=${offset}`
  ).then(({ data }) => data);
}
