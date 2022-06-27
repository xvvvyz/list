export interface Account {
  id: Id;
  profiles: Id[];
}

export interface Category {
  id: Id;
  items: Id[];
  meta?: Meta;
  text: string;
}

export interface CategoryParsed extends Omit<Category, 'items'> {
  items: ItemParsed[];
}

export interface Checklist {
  categories: Id[];
  completed: string[];
  id: Id;
  meta?: Meta;
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
  meta?: Meta;
  text: string;
}

export interface ItemParsed extends Item {
  completed?: boolean;
}

export interface Meta {
  autoFocus?: boolean;
  focusAtPosition?: number;
  updateValue?: string;
}

export interface Profile {
  categories: Id[];
  checklists: Id[];
  id: string;
  meta?: Meta;
  tags?: TagsMap;
  text: string;
}

export type Categories = Record<Id, Category>;
export type GenericObject = Record<string, unknown>;
export type Checklists = Record<Id, Checklist>;
export type Id = string;
export type Items = Record<Id, Item>;
export type Profiles = Record<Id, Profile>;
export type TagsMap = Record<Id, { color: number }>;
