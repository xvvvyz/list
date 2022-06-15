const mockData = {
  categories: {
    'category-1': {
      id: 'category-1',
      items: ['item-1', 'item-2'],
      text: 'before leaving',
    },
  },
  checklists: {
    'checklist-1': {
      categories: ['category-1'],
      completed: ['item-1'],
      id: 'checklist-1',
      tags: ['international', 'flight'],
      text: 'trip to bengaluru',
    },
    'checklist-2': {
      categories: ['category-1'],
      completed: [],
      id: 'checklist-2',
      tags: [],
      text: 'camping in the pnw',
    },
  },
  items: {
    'item-1': {
      id: 'item-1',
      text: 'buy insurance  international',
    },
    'item-2': {
      id: 'item-2',
      text: 'download shows and movies  flight',
    },
  },
  profiles: {
    'profile-1': {
      categories: ['category-1'],
      checklists: ['checklist-1', 'checklist-2'],
      id: 'profile-1',
      tags: { international: { color: 0 } },
      text: 'travel',
    },
    'profile-2': {
      categories: [],
      checklists: [],
      id: 'profile-2',
      tags: {},
      text: 'groceries',
    },
  },
  user: {
    id: 'account-1',
    profiles: ['profile-1', 'profile-2'],
  },
};

export default mockData;
