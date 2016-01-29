import {EDIT_PROJECT, DELETE_PROJECT, SAVE_PROJECT, EDIT_PROJECT_ALL} from '../actions/project'

let addProject = (project) => Object.assign({}, project, {
  id: new Date().getTime(),
  "build": ["compile", "upload"],
  "compile": {
    "babel": {
      "presets": ["es2015"],
      "plugins": ["transform-es2015-modules-mt-amd", "transform-react-jsx"]
    }
  },
  "watch": ["upload", "compile"]
});
let updateProject = (state, {id, ...other}) => {
  let date = new Date();
  let time = date.getTime();
  console.log(other);

  return state.map((project) => project.id == id
    ? Object.assign({}, project, other)
    : project)
};
export default (state = [], action) => {
  switch (action.type) {
    case EDIT_PROJECT:
      return updateProject(state, action.project);
    case SAVE_PROJECT:
      return [...state, addProject(action.project)];
    case DELETE_PROJECT:
      return state.filter((item) => item.id != action.id);
    case EDIT_PROJECT_ALL:
      return state.map((item) => Object.assign({}, item, action.data));
    default:
      return state;
  }
}
