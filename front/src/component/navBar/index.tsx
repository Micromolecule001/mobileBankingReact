import './index.css'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  return <nav>
    <button onClick={() => navigate(-1)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6L5 12L10 18" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12H19.5" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  </nav>
};

export default Nav;
