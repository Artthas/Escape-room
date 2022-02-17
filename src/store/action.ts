import {ActionType} from '../types/action';
import {Quests, Quest} from '../types/quest';
import {createAction} from '@reduxjs/toolkit';

export const loadQuests = createAction(
  ActionType.LoadQuests,
  (quests: Quests) => ({
    payload: quests,
  }),
);

export const loadCurrentQuest = createAction(
  ActionType.LoadCurrentQuest,
  (currentQuest: Quest) => ({
    payload: currentQuest,
  }),
);

export const changeCurrentType = createAction(
  ActionType.ChangeCurrentType,
  (typeName: string) => ({
    payload: typeName,
  }),
);

