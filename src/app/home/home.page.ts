import { Component, ViewChild } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PokeApiService } from 'src/services/poke.service';
import { IonModal } from '@ionic/angular';

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
  selectedPokemon: any = null;
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private pokeApiService: PokeApiService) {
    this.fetchPokemonTypes();
    this.loadMore();
  }

  async fetchPokemonTypes() {
    this.allTypes = await this.pokeApiService.loadPokemonTypes();
  }

  openModal(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.modal.present();
  }

  dismissModal() {
    this.modal.dismiss();
    this.selectedPokemon = null;
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
          const stats = details.stats.reduce((acc: any, statObj: any) => {
            const statName = statObj.stat.name.replace(/-/g, '');
            acc[statName] = statObj.base_stat;
            return acc;
          }, {});
          this.pokemons.push({
            name: details.name,
            image: details.sprites.front_default,
            types: details.types
              .map(
                (t: any) =>
                  t.type.name.charAt(0).toUpperCase() + t.type.name.substr(1)
              )
              .join(' '),
            height: details.height,
            weight: details.weight,
            id: details.id,
            ...stats,
          });
        }
        this.offset += this.limit;
        console.log(this.pokemons);
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
          const stats = details.stats.reduce((acc: any, statObj: any) => {
            const statName = statObj.stat.name.replace(/-/g, '');
            acc[statName] = statObj.base_stat;
            return acc;
          }, {});
          this.filteredPokemons.push({
            name: details.name,
            image: details.sprites.front_default,
            types: details.types
              .map(
                (t: any) =>
                  t.type.name.charAt(0).toUpperCase() + t.type.name.substr(1)
              )
              .join(' '),
            height: details.height,
            weight: details.weight,
            id: details.id,
            ...stats,
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
    if (this.search === '') {
      this.pokemons = [];
      const res = await this.pokeApiService.fetchPokemonByName(
        this.search.toLowerCase()
      );
      if (res) {
        for (const pokemon of res.results) {
          const details = await this.pokeApiService.fetchPokemonDetails(
            pokemon.url
          );
          const stats = details.stats.reduce((acc: any, statObj: any) => {
            const statName = statObj.stat.name.replace(/-/g, '');
            acc[statName] = statObj.base_stat;
            return acc;
          }, {});
          this.pokemons.push({
            name: details.name,
            image: details.sprites.front_default,
            types: details.types
              .map(
                (t: any) =>
                  t.type.name.charAt(0).toUpperCase() + t.type.name.substr(1)
              )
              .join(' '),
            height: details.height,
            weight: details.weight,
            id: details.id,
            ...stats,
          });
        }
      }
    } else if (this.search !== '') {
      this.pokemons = [];
      const details = await this.pokeApiService.fetchPokemonByName(
        this.search.toLowerCase()
      );
      const stats = details.stats.reduce((acc: any, statObj: any) => {
        const statName = statObj.stat.name.replace(/-/g, '');
        acc[statName] = statObj.base_stat;
        return acc;
      }, {});
      if (details) {
        this.pokemons.push({
          name: details.name,
          image: details.sprites.front_default,
          types: details.types
            .map(
              (t: any) =>
                t.type.name.charAt(0).toUpperCase() + t.type.name.substr(1)
            )
            .join(' '),
          height: details.height,
          weight: details.weight,
          id: details.id,
          ...stats,
        });
      }
    }
  }

  handleChangeSearch(name: string) {
    this.search = name;
  }

  getTypeClass(types: string): string {
    const firstType = types.split(' ')[0];
    switch (firstType) {
      case 'Grass':
        return 'badge-grass';
      case 'Fire':
        return 'badge-fire';
      case 'Water':
        return 'badge-water';
      case 'Electric':
        return 'badge-electric';
      case 'Flying':
        return 'badge-flying';
      case 'Normal':
        return 'badge-normal';
      case 'Poison':
        return 'badge-poison';
      case 'Fairy':
        return 'badge-fairy';
      case 'Ground':
        return 'badge-ground';
      case 'Bug':
        return 'badge-bug';
      case 'Rock':
        return 'badge-rock';
      case 'Dark':
        return 'badge-dark';
      case 'Dragon':
        return 'badge-dragon';
      case 'Ice':
        return 'badge-ice';
      case 'Ghost':
        return 'badge-ghost';
      case 'Steel':
        return 'badge-steel';
      case 'Stellar':
        return 'badge-stellar';
      case 'Psychic':
        return 'badge-psychic';
      case 'Fighting':
        return 'badge-fighting';
      default:
        return 'badge-default';
    }
  }

  resetData() {
    this.pokemons = [];
    this.filteredPokemons = [];
    this.offset = 0;
    this.hasMore = true;
  }
}
