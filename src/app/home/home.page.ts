import { Component, ViewChild } from '@angular/core';
import { PokeApiService } from 'src/services/poke.service';
import { IonModal } from '@ionic/angular';
import { HelpersClass } from 'src/utils/helpers';

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

  constructor(
    private pokeApiService: PokeApiService,
    private helpers: HelpersClass
  ) {
    this.fetchPokemonTypes();
    this.loadMore();
  }

  // GET pokemon type and assign their classes
  getTypeClass(type: string) {
    return this.helpers.getTypeClass(type);
  }

  // GET all pokemon types from API
  async fetchPokemonTypes() {
    this.allTypes = await this.pokeApiService.loadPokemonTypes();
  }

  // Open modal interaction for pokemon detail
  openModal(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.modal.present();
  }

  // Close modal interaction
  dismissModal() {
    this.modal.dismiss();
    this.selectedPokemon = null;
  }

  // GET all favorite pokemons from local storage
  getFavorites(): any[] {
    const fav = this.helpers.getLocalStorageFavorite();
    return fav ? JSON.parse(fav) : [];
  }

  // Save favorite pokemons to local storage
  saveFavorites(favorites: any[]) {
    localStorage.setItem('favoritePokemons', JSON.stringify(favorites));
  }

  // Handle favorite pokemon interaction
  toggleFavorite(pokemon: any) {
    this.selectedPokemon = pokemon;
    const favorites = this.getFavorites();
    const index = favorites.findIndex((fav: any) => fav.id === pokemon.id);
    if (index === -1) {
      favorites.push(pokemon);
      pokemon.isFavorite = true;
    } else {
      favorites.splice(index, 1);
      pokemon.isFavorite = false;
    }
    this.saveFavorites(favorites);
  }

  // GET all pokemon with limit 20 pokemons every API call
  async loadMore(event?: any) {
    if (!this.hasMore) {
      if (event) event.target.complete();
      return;
    }

    try {
      const favorites = this.getFavorites();

      if (this.selectedType === 'all') {
        // GET all pokemon with limit dan offset of pokemons every API call
        const data = await this.pokeApiService.fetchPokemon(
          this.offset,
          this.limit
        );

        for (const pokemon of data.results) {
          // GET all pokemon detail
          const details = await this.pokeApiService.fetchPokemonDetails(
            pokemon.url
          );

          // Split pokemon types if they have more than 1
          const stats = details.stats.reduce((acc: any, statObj: any) => {
            const statName = statObj.stat.name.replace(/-/g, '');
            acc[statName] = statObj.base_stat;
            return acc;
          }, {});

          // Checks is there any favorite pokemons
          const isFavorite = favorites.some(
            (fav: any) => fav.id === details.id
          );

          // Combined all the data into the array
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
            isFavorite,
            ...stats,
          });
        }
        
        // Continue the starting point to GET another pokemons
        this.offset += this.limit;

        // Checks if current data already as much as all pokemons count to stop the API call
        if (this.pokemons.length >= data.count) {
          this.hasMore = false;
        }
      } else {
        // GET all pokemons by the selected type
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

          const isFavorite = favorites.some(
            (fav: any) => fav.id === details.id
          );

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
            isFavorite,
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

  // Handle type change by user
  onTypeChange(type: string) {
    this.selectedType = type;
    this.search = '';
    this.resetData();
    this.loadMore();
  }

  // GET pokemon by it's name
  async handleSearchPokemon() {
    const favorites = this.getFavorites();
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

          const isFavorite = favorites.some(
            (fav: any) => fav.id === details.id
          );

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
            isFavorite,
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

      const isFavorite = favorites.some((fav: any) => fav.id === details.id);
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
          isFavorite,
          ...stats,
        });
      }
    }
  }

  /// Handle name search by user
  handleChangeSearch(name: string) {
    this.search = name;
  }

  // Reset data when type changes by user
  resetData() {
    this.pokemons = [];
    this.filteredPokemons = [];
    this.offset = 0;
    this.hasMore = true;
  }
}
