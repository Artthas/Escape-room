import {Quest, Quests} from '../types/quest';
import {RootState} from '../store/root-reducer';

export type QuestsData = {
  quests: Quests,
  currentQuest: Quest,
}

export type QuestsOtherData = {
  currentType: string,
}

export type State = RootState;
