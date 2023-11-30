export default function FavoritesPage() {
  return <h5>Favoritos</h5>;
}

export class FavoritesPageHandler {
  static route(): string {
    return '/favorites';
  }
  static navigate(): string {
    return '/favorites';
  }
}
