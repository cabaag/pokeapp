const types: any = {
  bug: '#1C4B27',
  dark: '#040706',
  dragon: '#448B95',
  electric: '#E3E32C',
  fairy: '#EA1369',
  fighting: '#EF6138',
  fire: '#AB1F23',
  flying: '#4A677D',
  ghost: '#906790',
  grass: '#11893A',
  ground: '#6E491F',
  ice: '#D9EFFA',
  normal: '#76515B',
  poison: '#5E2D88',
  psychic: '#F81C91',
  rock: '#A7A9AD',
  steel: '#5F756D',
  water: '#1552E2',
};

export default function typesMapper(type: string): string {
  return types[type];
}
