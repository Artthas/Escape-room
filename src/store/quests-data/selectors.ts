import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Quests, Quest} from '../../types/quest';

export const getQuests = (state: State): Quests => state[NameSpace.quests].quests;
export const getCurrentQuest = (state: State): Quest => state[NameSpace.quests].currentQuest;
