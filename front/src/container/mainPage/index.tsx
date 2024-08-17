import { useNavigate } from 'react-router-dom';
import './index.css';

import Header from '../../component/statusBar';
import Button from '../../component/button';
import Footer from '../../component/footer';

import coinsImage from '../../img/coins.png'; 

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className="main-text-wrapper">
        <Header color={'white'} />
        <h1 className='main-title'> Hello! </h1>
        <p className="main-sub-title"> Welcome to bank app </p>
        <img src={coinsImage} alt="Coins" />
      </div>

      <div className="main-button-wrapper">
        <Button primary={true} onClick={() => navigate('/signup')} type={'button'}>
          <p className='button-text' >Sign up</p>
        </Button>
        <Button onClick={() => navigate('/signin')} type={'button'}>Sign in</Button>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
