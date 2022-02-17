import { Header, Footer } from 'components/common/common';

const MainLayout = ({ children, activeLink }) => (
  <>
    <Header activeLink={activeLink}/>
    {children}
    <Footer />
  </>
);

export default MainLayout;
