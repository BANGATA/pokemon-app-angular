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

  getFavorites() {
    const fav = this.helpers.getLocalStorageFavorite();
    this.pokemons = fav ? JSON.parse(fav) : [];
  }

  toggleFavorite(pokemon: any): void {
    pokemon.isFavorite = false;
    this.pokemons = this.pokemons.filter((p) => p.isFavorite);
    localStorage.setItem('favoritePokemons', JSON.stringify(this.pokemons));
    this.dismissModal();
  }

  openModal(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.modal.present();
  }

  dismissModal() {
    this.modal.dismiss();
    this.selectedPokemon = null;
  }

  getTypeClass(type: string) {
    return this.helpers.getTypeClass(type);
  }
}
