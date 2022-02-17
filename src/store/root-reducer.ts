import {combineReducers} from 'redux';
import {questsData} from './quests-data/quests-data';
import {questsOtherData} from './quests-other-data/quests-other-data';

export enum NameSpace {
  quests = 'QUESTS',
  questsOther = 'QUESTS_OTHER',
}

export const rootReducer = combineReducers({
  [NameSpace.quests]: questsData,
  [NameSpace.questsOther]: questsOtherData,
});

export type RootState = ReturnType<typeof rootReducer>;
