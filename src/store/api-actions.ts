import {ThunkActionResult} from '../types/action';
import {loadQuests, loadCurrentQuest} from './action';
import {APIRoute} from '../const';
import {Quest} from '../types/quest';
import {Order} from '../types/order';

type postCommentCbType = () => void;

export const fetchQuestsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Quest[]>(APIRoute.Quests);
    dispatch(loadQuests(data));
  };

export const fetchCurrentQuestAction = (questId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Quest>(`${APIRoute.Quests}/${questId}`);
    dispatch(loadCurrentQuest(data));
  };

export const postOrderAction = ({name, peopleCount, phone, isLegal}: Order, onSuccess: postCommentCbType, onFail: postCommentCbType): ThunkActionResult =>
  async (_, _getState, api) => {
    try {
      await api.post<Order[]>(`${APIRoute.Orders}`, {name, peopleCount, phone, isLegal});
      onSuccess();
    } catch(error) {
      onFail();
    }
  };
  