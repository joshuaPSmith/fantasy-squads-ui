export default interface Squad {
    id: string;
    name: string;
    teamsList: Array<string>;
    winPoints?: number;
    standingsPoints?: number;
    totalPoints?: number;
  }
