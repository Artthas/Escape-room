import { ThemeProvider } from 'styled-components';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'components/common/common';
import DetailedQuest from 'components/detailed-quest/detailed-quest';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute} from '../../const';
import Contacts from 'components/contacts/contacts';
import Home from 'components/home/home';
import { appTheme } from './common';
import * as S from './app.styled';

const App = () => (
  <ThemeProvider theme={appTheme}>
    <S.GlobalStyle />
    <Router>
      <Switch>
        <Route exact path={AppRoute.Root} component={Home}/>
        <Route exact path={AppRoute.DetailedQuest} component={DetailedQuest}/>
        <Route exact path={AppRoute.Contacts} component={Contacts}/>
        <Route>
           <NotFoundScreen />
         </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
