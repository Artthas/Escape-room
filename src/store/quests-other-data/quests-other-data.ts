import {QuestsOtherData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {changeCurrentType} from '../action';

const initialState: QuestsOtherData = {
  currentType: 'Все квесты',
};

const questsOtherData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentType, (state, action) => {
      state.currentType = action.payload;
    })
});

export {questsOtherData};
