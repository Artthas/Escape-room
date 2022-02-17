import {
  MainLayout,
  PageTitle,
  PageHeading,
  PageSubtext,
} from 'components/common/common';
import { QuestsCatalog } from './components/components';
import * as S from './home.styled';
import {getQuests} from '../../store/quests-data/selectors';
import {getCurrentType} from '../../store/quests-other-data/selectors';
import {changeCurrentType} from '../../store/action';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

const HomePage = (): JSX.Element => {
  const quests = useSelector(getQuests);
  const currentType = useSelector(getCurrentType);

  const activeLink = 'Квесты';

  const dispatch = useDispatch();

  const onUserClick = (genreName: string) => {
    dispatch(changeCurrentType(genreName));
  };

  const [filteredQuests, setFilteredQuests] = useState(quests);

  useEffect(() => {
    const isAllQuestsTab = currentType === 'Все квесты';
    const tempFilteredQuests = isAllQuestsTab ? [...quests] : quests.filter((quest) => quest.type === currentType);
    setFilteredQuests(tempFilteredQuests);
  }, [currentType, quests]);

  return (
    <MainLayout activeLink={activeLink}>
      <S.Main forwardedAs="main">
        <PageHeading>
          <PageTitle>Выберите тематику</PageTitle>
          <PageSubtext>квесты в Санкт-Петербурге</PageSubtext>
        </PageHeading>
        <QuestsCatalog quests={filteredQuests} currentType={currentType} onUserClick={onUserClick}/>
      </S.Main>
    </MainLayout>
  )
}

export default HomePage;
