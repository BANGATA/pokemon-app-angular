import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { HelpersClass } from 'src/utils/helpers';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: false,
})
export class FavoritePage {
  pokemons: any[] = [];
  selectedPokemon: any = null;
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private helpers: HelpersClass) {
    this.getFavorites();
  }

  // GET all favorite pokemons from local storage
  getFavorites() {
    const fav = this.helpers.getLocalStorageFavorite();
    this.pokemons = fav ? JSON.parse(fav) : [];
  }

  // DELETE favorite pokemon from local storage
  toggleFavorite(pokemon: any): void {
    pokemon.isFavorite = false;
    this.pokemons = this.pokemons.filter((p) => p.isFavorite);
    localStorage.setItem('favoritePokemons', JSON.stringify(this.pokemons));
    this.dismissModal();
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

  // GET pokemon type and assign their classes
  getTypeClass(type: string) {
    return this.helpers.getTypeClass(type);
  }
}
