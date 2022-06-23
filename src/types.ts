import React from 'react';

export interface Account {
  user: User;
  categories: Categories;
  checklists: Checklists;
  items: Items;
  profiles: Profiles;
}

export interface AccountContext extends Account {
  activeProfile: ProfileParsed | null;
  parsed: ProfileParsed[];
  setCategories: ReactSetState<Categories>;
  setChecklists: ReactSetState<Checklists>;
  setItems: ReactSetState<Items>;
  setProfiles: ReactSetState<Profiles>;
  setUser: ReactSetState<User>;
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

export interface ChecklistParsed {
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

export interface ProfileParsed {
  categories: CategoryParsed[];
  checklists: ChecklistParsed[];
  id: string;
  tags?: TagsMap;
  text: string;
}

export interface User {
  id: Id;
  profiles: Id[];
}

export type Categories = Record<Id, Category>;
export type Checklists = Record<Id, Checklist>;
export type Id = string;
export type Items = Record<Id, Item>;
export type Profiles = Record<Id, Profile>;
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type TagsMap = Record<Id, { color: number }>;