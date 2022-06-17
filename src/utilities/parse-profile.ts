import parseCategory from './parse-category';
import parseChecklist from './parse-checklist';

const parseProfile = (id, data) => ({
  categories: data.profilesMap[id].categories.map((categoryId) =>
    parseCategory(categoryId, data)
  ),
  checklists: data.profilesMap[id].checklists.map((checklistId) =>
    parseChecklist(checklistId, data)
  ),
  id,
  text: data.profilesMap[id].text,
});

export default parseProfile;
