import { useState } from 'react';
import { MainLayout } from 'components/common/common';
import { ReactComponent as IconClock } from 'assets/img/icon-clock.svg';
import { ReactComponent as IconPerson } from 'assets/img/icon-person.svg';
import { ReactComponent as IconPuzzle } from 'assets/img/icon-puzzle.svg';
import * as S from './detailed-quest.styled';
import { BookingModal } from './components/components';
import {useParams} from 'react-router-dom';
import {getCurrentQuest} from '../../store/quests-data/selectors';
import {useSelector} from 'react-redux';
import {store} from '../../index';
import {fetchCurrentQuestAction} from '../../store/api-actions';
import {useEffect} from 'react';

type DetailedQuestParams = {
  questId: string;
};

const DetailedQuest = (): JSX.Element => {
  const currentQuest = useSelector(getCurrentQuest);

  const activeLink = '';

  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false);

  const onBookingBtnClick = () => {
    setIsBookingModalOpened(true);
  };

  const onClosingBookingBtnClick = () => {
    setIsBookingModalOpened(false);
  };

  const {questId} = useParams<DetailedQuestParams>();

  useEffect(() => {
    (store.dispatch)(fetchCurrentQuestAction(questId));
  }, [questId]);

  return (
    <MainLayout activeLink={activeLink}>
      <S.Main>
        <S.PageImage
          src={`../${currentQuest.coverImg}`}
          alt={`Квест ${currentQuest.title}`}
          width="1366"
          height="768"
        />
        <S.PageContentWrapper>
          <S.PageHeading>
            <S.PageTitle>{currentQuest.title}</S.PageTitle>
            <S.PageSubtitle>{currentQuest.type}</S.PageSubtitle>
          </S.PageHeading>

          <S.PageDescription>
            <S.Features>
              <S.FeaturesItem>
                <IconClock width="20" height="20" />
                <S.FeatureTitle>{currentQuest.duration} мин</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPerson width="19" height="24" />
                <S.FeatureTitle>{currentQuest.peopleCount[0]}–{currentQuest.peopleCount[1]} чел</S.FeatureTitle>
              </S.FeaturesItem>
              <S.FeaturesItem>
                <IconPuzzle width="24" height="24" />
                <S.FeatureTitle>{currentQuest.level}</S.FeatureTitle>
              </S.FeaturesItem>
            </S.Features>

            <S.QuestDescription>
              {currentQuest.description}
            </S.QuestDescription>

            <S.QuestBookingBtn onClick={onBookingBtnClick}>
              Забронировать
            </S.QuestBookingBtn>
          </S.PageDescription>
        </S.PageContentWrapper>

        {isBookingModalOpened && <BookingModal currentQuest={currentQuest} onClosingBookingBtnClick={onClosingBookingBtnClick} />}
      </S.Main>
    </MainLayout>
  );
};

export default DetailedQuest;
