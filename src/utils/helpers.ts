import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersClass {
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

  getLocalStorageFavorite() {
    const favorites = localStorage.getItem('favoritePokemons');
    return favorites
  }
}
