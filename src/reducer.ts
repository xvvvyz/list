import { Reducer } from 'react';
import createCategory, { CreateCategoryAction } from './reducers/create-category';
import createChecklist, { CreateChecklistAction } from './reducers/create-checklist';
import createItem, { CreateItemAction } from './reducers/create-item';
import createProfile, { CreateProfileAction } from './reducers/create-profile';
import deleteCategory, { DeleteCategoryAction } from './reducers/delete-category';
import deleteChecklist, { DeleteChecklistAction } from './reducers/delete-checklist';
import deleteItem, { DeleteItemAction } from './reducers/delete-item';
import deleteMeta, { DeleteMetaAction } from './reducers/delete-meta';
import deleteProfile, { DeleteProfileAction } from './reducers/delete-profile';
import initialize, { InitializeAction } from './reducers/initialize';
import moveItem, { MoveItemAction } from './reducers/move-item';
import reorderCategory, { ReorderCategoryAction } from './reducers/reorder-category';
import reorderItem, { ReorderItemAction } from './reducers/reorder-item';
import setActiveProfile, { SetActiveProfileAction } from './reducers/set-active-profile';
import updateCategory, { UpdateCategoryAction } from './reducers/update-category';
import updateChecklist, { UpdateChecklistAction } from './reducers/update-checklist';
import updateItem, { UpdateItemAction } from './reducers/update-item';
import updateProfile, { UpdateProfileAction } from './reducers/update-profile';
import updateStatus, { UpdateStatusAction } from './reducers/update-status';
import { State } from './types';

type Action =
  | CreateCategoryAction
  | CreateChecklistAction
  | CreateItemAction
  | CreateProfileAction
  | DeleteCategoryAction
  | DeleteChecklistAction
  | DeleteItemAction
  | DeleteMetaAction
  | DeleteProfileAction
  | InitializeAction
  | MoveItemAction
  | ReorderCategoryAction
  | ReorderItemAction
  | SetActiveProfileAction
  | UpdateCategoryAction
  | UpdateChecklistAction
  | UpdateItemAction
  | UpdateProfileAction
  | UpdateStatusAction;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'CreateCategory':
      return createCategory(state, action);

    case 'CreateChecklist':
      return createChecklist(state, action);

    case 'CreateItem':
      return createItem(state, action);

    case 'CreateProfile':
      return createProfile(state, action);

    case 'DeleteCategory':
      return deleteCategory(state, action);

    case 'DeleteChecklist':
      return deleteChecklist(state, action);

    case 'DeleteItem':
      return deleteItem(state, action);

    case 'DeleteMeta':
      return deleteMeta(state);

    case 'DeleteProfile':
      return deleteProfile(state, action);

    case 'Initialize':
      return initialize(state, action);

    case 'MoveItem':
      return moveItem(state, action);

    case 'ReorderCategory':
      return reorderCategory(state, action);

    case 'ReorderItem':
      return reorderItem(state, action);

    case 'SetActiveProfile':
      return setActiveProfile(state, action);

    case 'UpdateCategory':
      return updateCategory(state, action);

    case 'UpdateChecklist':
      return updateChecklist(state, action);

    case 'UpdateItem':
      return updateItem(state, action);

    case 'UpdateProfile':
      return updateProfile(state, action);

    case 'UpdateStatus':
      return updateStatus(state, action);

    default:
      return state;
  }
};

export default reducer;
export type { Action, State };
