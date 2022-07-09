export interface Account {
  id: Id;
  profiles: Id[];
}

export interface Category {
  id: Id;
  items: Id[];
  text: string;
}

export interface CategoryParsed extends Omit<Category, 'items'> {
  items: ItemParsed[];
}

export interface Checklist {
  categories: Id[];
  completed: string[];
  id: Id;
  tags: Id[];
  text: string;
}

export interface ChecklistDenormalized extends Omit<Checklist, 'categories' | 'completed' | 'tags'> {
  checklist: CategoryParsed[];
  itemsCompletedCount: number;
  itemsCount: number;
}

export interface Item {
  id: Id;
  text: string;
}

export interface ItemParsed extends Item {
  completed?: boolean;
}

export interface Profile {
  categories: Id[];
  checklists: Id[];
  id: string;
  tags?: TagsMap;
  text: string;
}

export interface State {
  account: Account;
  categories: Categories;
  checklists: Checklists;
  items: Items;
  profiles: Profiles;
  status: Status;
}

export interface Status {
  isLoading: boolean;
}

export type Categories = Record<Id, Category>;
export type Checklists = Record<Id, Checklist>;
export type GenericObject = Record<string, unknown>;
export type Id = string;
export type Items = Record<Id, Item>;
export type Profiles = Record<Id, Profile>;
export type TagsMap = Record<Id, { color: number }>;
