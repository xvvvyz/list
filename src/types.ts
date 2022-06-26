export interface Account {
  id: Id;
  profiles: Id[];
}

export interface Category {
  id: Id;
  items: Id[];
  text: string;
}

export interface CategoryParsed {
  id: Id;
  items: ItemParsed[];
  text: string;
}

export interface Checklist {
  categories: Id[];
  completed: string[];
  id: Id;
  tags: Id[];
  text: string;
}

export interface ChecklistDenormalized {
  checklist: CategoryParsed[];
  id: Id;
  itemsCompletedCount: number;
  itemsCount: number;
  text: string;
}

export interface Item {
  id: Id;
  text: string;
}

export interface ItemParsed {
  id: Id;
  text: string;
  completed?: boolean;
}

export interface Profile {
  categories: Id[];
  checklists: Id[];
  id: string;
  tags?: TagsMap;
  text: string;
}

export type Categories = Record<Id, Category>;
export type Checklists = Record<Id, Checklist>;
export type Id = string;
export type Items = Record<Id, Item>;
export type Profiles = Record<Id, Profile>;
export type TagsMap = Record<Id, { color: number }>;
