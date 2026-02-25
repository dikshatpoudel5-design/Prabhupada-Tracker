
export interface Book {
  id: string;
  title: string;
  category: number;
  link: string;
}

export interface ShlokaData {
  reference: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  date?: string;
}

export interface AppState {
  bookStatus: Record<string, boolean>;
  bookNotes: Record<string, string>;
  dailyShloka: ShlokaData | null;
  shlokaHistory: string[];
}
