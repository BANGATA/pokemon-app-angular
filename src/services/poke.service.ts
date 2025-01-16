import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = environment.api_url;
  async fetchPokemon(offset: number, limit: number): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      throw error;
    }
  }

  async loadPokemonTypes() {
    try {
      const response = await axios.get(`${environment.api_url}type/`);
      return response.data.results.map((type: any) => type.name);
    } catch (error) {
      console.error('Error fetching Pokémon types:', error);
    }
  }

  async fetchPokemonByName(name?: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}pokemon/${name}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      throw error;
    }
  }

  async fetchPokemonByType(type: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      return response.data.pokemon.map((entry: any) => entry.pokemon);
    } catch (error) {
      console.error('Error fetching Pokémon by type:', error);
      throw error;
    }
  }

  async fetchPokemonDetails(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      throw error;
    }
  }
}
