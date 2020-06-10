export const TOTAL_OPTIONS = 4;
export const category = [
  {
    name: 'Sport',
    value: 'Sport',
    icon: 'football',
  },
  {
    name: 'Politics',
    value: 'Politics',
    icon: 'flag',
  },
  {
    name: 'Geography',
    value: 'Geography',
    icon: 'map',
  },
  {
    name: 'Music',
    value: 'Music',
    icon: 'musical-note',
  },
];

export const getCategoryIcon = (categoryName: string) => {
  return category.find((obj) => obj.name === categoryName)?.icon || '';
};

export const VALIDATION = {
  SOMETING_WENT_WRONG: 'Something went wrong.',
  SEASON_ENDED: 'Season has been ended successfully!',
  SEASON_HOSTED: 'A new season is hosted successfully',
  QUESTION_PUBLISHED: 'A new question is published successfully.',
};
