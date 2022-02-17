import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';

export const getCurrentType = (state: State): string => state[NameSpace.questsOther].currentType;

