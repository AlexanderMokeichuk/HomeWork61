export interface ReceivedCountries {
  name: string;
  alpha3Code: string;
  independent: boolean;
}
export interface Countries {
  id: string;
  name: string;
  alpha3Code: string;
  independent: boolean;
}

interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface Country {
  area: number;
  borders?: string[];
  capital: string;
  flags: {
    png: string,
    svg: string,
  };
  languages: Language[];
  name: string;
  population: number;
}