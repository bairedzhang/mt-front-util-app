export const EDIT_PROJECT = 'EDIT_PROJECT';
export const EDIT_PROJECT_ALL = 'EDIT_PROJECT_ALL';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const SAVE_GLOBAL= 'SAVE_GLOBAL';

export function saveGlobal(data) {
  return {
    type: SAVE_GLOBAL,
    data
  };
}

export function save(project) {
  return {
    type: SAVE_PROJECT,
    project
  };
}

export function edit(project) {
  return {
    type: EDIT_PROJECT,
    project
  };
}

export function del(id) {
  return {
    type: DELETE_PROJECT,
    id
  };
}

export function editAll(data) {
  return {
    type: SAVE_GLOBAL,
    data
  };
}
