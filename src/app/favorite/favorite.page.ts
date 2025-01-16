import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

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
  isAlertOpen: boolean = false;
  constructor() {
    this.getFavorites();
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.isAlertOpen = false;
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.toggleFavorite(this.selectedPokemon);
      },
    },
  ];

  dismissAlert() {
    this.isAlertOpen = false;
  }

  openAlert(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.isAlertOpen = true;
  }

  getFavorites() {
    const favorites = localStorage.getItem('favoritePokemons');
    this.pokemons = favorites ? JSON.parse(favorites) : [];
  }

  toggleFavorite(pokemon: any): void {
    pokemon.isFavorite = false;
    this.pokemons = this.pokemons.filter((p) => p.isFavorite);
    localStorage.setItem('favoritePokemons', JSON.stringify(this.pokemons));
    this.dismissModal();
    this.dismissAlert();
  }

  openModal(pokemon: any) {
    this.selectedPokemon = pokemon;
    this.modal.present();
  }

  dismissModal() {
    this.modal.dismiss();
    this.selectedPokemon = null;
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
}
