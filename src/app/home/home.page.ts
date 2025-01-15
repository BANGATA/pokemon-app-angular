import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PokeApiService } from 'src/services/poke.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  offset = 0;
  limit = 20;
  hasMore = true;
  selectedType = 'all';
  allTypes: string[] = [];
  search: string = '';

  constructor(private pokeApiService: PokeApiService) {
    this.loadPokemonTypes();
    this.loadMore();
  }

  async loadPokemonTypes() {
    try {
      const response = await axios.get(`${environment.api_url}type/`);
      this.allTypes = response.data.results.map((type: any) => type.name);
    } catch (error) {
      console.error('Error fetching Pokémon types:', error);
    }
  }

  async loadMore(event?: any) {
    if (!this.hasMore) {
      if (event) event.target.complete();
      return;
    }

    try {
      if (this.selectedType === 'all') {
        const data = await this.pokeApiService.fetchPokemon(
          this.offset,
          this.limit
        );
        for (const pokemon of data.results) {
          const details = await this.pokeApiService.fetchPokemonDetails(
            pokemon.url
          );
          this.pokemons.push({
            name: details.name,
            image: details.sprites.front_default,
            types: details.types.map(
              (t: any) =>
                t.type.name.charAt(0).toUpperCase() + t.type.name.substr(1)
            ),
            height: details.height,
            weight: details.weight,
          });
        }
        this.offset += this.limit;

        if (this.pokemons.length >= data.count) {
          this.hasMore = false;
        }
      } else {
        const data = await this.pokeApiService.fetchPokemonByType(
          this.selectedType
        );
        for (const pokemon of data) {
          const details = await this.pokeApiService.fetchPokemonDetails(
            pokemon.url
          );
          this.filteredPokemons.push({
            name: details.name,
            image: details.sprites.front_default,
            types: details.types.map(
              (t: any) =>
                t.type.name.charAt(0).toUpperCase() + t.type.name.substr(1)
            ),
            height: details.height,
            weight: details.weight,
          });
        }
        this.hasMore = false;
      }

      if (event) event.target.complete();
    } catch (error) {
      console.error('Error loading more Pokémon:', error);
      if (event) event.target.complete();
    }
  }

  onTypeChange(type: string) {
    this.selectedType = type;
    this.search = '';
    this.resetData();
    this.loadMore();
  }

  async handleSearchPokemon() {
    this.pokemons = [];
    const res = await this.pokeApiService.fetchPokemonByName(
      this.search.toLowerCase()
    );
    this.pokemons.push({
      name: res.name,
      image: res.sprites.front_default,
      types: res.types.map((t: any) => t.type.name),
    });
  }

  handleChangeSearch(event: any) {
    this.search = event.detail.value;
  }

  resetData() {
    this.pokemons = [];
    this.filteredPokemons = [];
    this.offset = 0;
    this.hasMore = true;
  }
}
