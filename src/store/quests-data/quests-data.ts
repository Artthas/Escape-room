import {QuestsData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadCurrentQuest, loadQuests} from '../action';

const initialState: QuestsData = {
  quests: [],
  currentQuest: {
    "id": 0,
    "title": "",
    "description": "",
    "previewImg": "",
    "coverImg": "",
    "type": "",
    "level": "",
    "peopleCount": [],
    "duration": 0
  },
};

const questsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadQuests, (state, action) => {
      state.quests = action.payload;
    })
    .addCase(loadCurrentQuest, (state, action) => {
      state.currentQuest = action.payload;
    })
});

export {questsData};
