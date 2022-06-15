import parseCategory from './parse-category';
import parseChecklist from './parse-checklist';

const parseProfile = (id, data) => ({
  categories: data.profiles[id].categories.map((categoryId) =>
    parseCategory(categoryId, data)
  ),
  checklists: data.profiles[id].checklists.map((checklistId) =>
    parseChecklist(checklistId, data)
  ),
  id,
  text: data.profiles[id].text,
});

export default parseProfile;
