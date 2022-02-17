import { ReactComponent as IconAllQuests } from 'assets/img/icon-all-quests.svg';
import { ReactComponent as IconAdventures } from 'assets/img/icon-adventures.svg';
import { ReactComponent as IconHorrors } from 'assets/img/icon-horrors.svg';
import { ReactComponent as IconMystic } from 'assets/img/icon-mystic.svg';
import { ReactComponent as IconDetective } from 'assets/img/icon-detective.svg';
import { ReactComponent as IconScifi } from 'assets/img/icon-scifi.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import {Quests} from '../../../../types/quest';
import {MouseEvent} from 'react';
import * as S from './quests-catalog.styled';

type QuestsCatalogProps = {
  quests: Quests,
  currentType: string,
  onUserClick(genreName: string): void,
}

const QuestsCatalog = ({quests, currentType, onUserClick}: QuestsCatalogProps): JSX.Element => {
  const onUserClickWrapper = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (evt.currentTarget.textContent !== null) {
      onUserClick(evt.currentTarget.textContent);
    }
  }

  return (
  <>
    <S.Tabs>
      <S.TabItem>
        <S.TabBtn
          onClick={onUserClickWrapper}
          isActive = {currentType === 'Все квесты' ? true : false}
        >
          <IconAllQuests />
          <S.TabTitle>Все квесты</S.TabTitle>
        </S.TabBtn>
      </S.TabItem>

      <S.TabItem>
        <S.TabBtn
          onClick={onUserClickWrapper}
          isActive = {currentType === 'Приключения' ? true : false}
        >
          <IconAdventures />
          <S.TabTitle>Приключения</S.TabTitle>
        </S.TabBtn>
      </S.TabItem>

      <S.TabItem>
        <S.TabBtn
          onClick={onUserClickWrapper}
          isActive = {currentType === 'Ужасы' ? true : false}
        >
          <IconHorrors />
          <S.TabTitle>Ужасы</S.TabTitle>
        </S.TabBtn>
      </S.TabItem>

      <S.TabItem>
        <S.TabBtn
          onClick={onUserClickWrapper}
          isActive = {currentType === 'Мистика' ? true : false}
        >
          <IconMystic />
          <S.TabTitle>Мистика</S.TabTitle>
        </S.TabBtn>
      </S.TabItem>

      <S.TabItem>
        <S.TabBtn
          onClick={onUserClickWrapper}
          isActive = {currentType === 'Детектив' ? true : false}
        >
          <IconDetective />
          <S.TabTitle>Детектив</S.TabTitle>
        </S.TabBtn>
      </S.TabItem>

      <S.TabItem>
        <S.TabBtn
          onClick={onUserClickWrapper}
          isActive = {currentType === 'Sci-fi' ? true : false}
        >
          <IconScifi />
          <S.TabTitle>Sci-fi</S.TabTitle>
        </S.TabBtn>
      </S.TabItem>
    </S.Tabs>

    <S.QuestsList>

    {quests.map((quest) => <S.QuestItem key={quest.id}>
        <S.QuestItemLink to={`/detailed-quest/${quest.id}`}>
          <S.Quest>
            <S.QuestImage
              src={quest.previewImg}
              width="344"
              height="232"
              alt={`квест ${quest.title}`}
            />

            <S.QuestContent>
              <S.QuestTitle>{quest.title}</S.QuestTitle>

              <S.QuestFeatures>
                <S.QuestFeatureItem>
                  <IconPerson />
                  {quest.peopleCount[0]}–{quest.peopleCount[1]} чел
                </S.QuestFeatureItem>
                <S.QuestFeatureItem>
                  <IconPuzzle />
                  {quest.level}
                </S.QuestFeatureItem>
              </S.QuestFeatures>
            </S.QuestContent>
          </S.Quest>
        </S.QuestItemLink>
      </S.QuestItem>)}

    </S.QuestsList>
  </>
  );
};

export default QuestsCatalog;
