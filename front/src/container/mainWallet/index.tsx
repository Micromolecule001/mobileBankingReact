import './index.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../../component/statusBar';
import Payment from '../../component/payment';
import Footer from '../../component/footer';

interface PaymentType {
  id: string;
  email: string;
  from: string | null;
  to: string | null;
  type: string;
  amount: {
    dollars: number;
    cents: string;
  };
  time: string;
}

const Wallet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || { email: '' };

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState({dollars: 0, cents: '00'})
  const [payments, setPayments] = useState<PaymentType[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:4000/wallet/main', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData.user);
          setBalance({dollars: userData.user.balance.dollars, cents: userData.user.balance.cents })
          setPayments(userData.user.payments)
        } else {
          console.error('Failed to load user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
    
  }, [email]);

  return (
    <div className='container'>
      <div className="wallet-text-wrapper">
        <Header color={'white'} />
        <div className="navigation">
          <div className="nav-icon">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="3.57672" y1="6.25" x2="6.07672" y2="6.25" stroke="#F3F5FF" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="22.0767" y1="16.75" x2="19.5767" y2="16.75" stroke="#F3F5FF" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="12.5767" y1="6.25" x2="22.0767" y2="6.25" stroke="#F3F5FF" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="13.0767" y1="16.75" x2="3.57672" y2="16.75" stroke="#F3F5FF" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9.32672" cy="6.5" r="2.75" stroke="#F3F5FF" strokeWidth="1.5"/>
              <circle cx="3.5" cy="3.5" r="2.75" transform="matrix(-1 0 0 1 19.8267 13)" stroke="#F3F5FF" strokeWidth="1.5"/>
            </svg>
          </div>
          <h5 className="nav-title"> Main wallet </h5>
          <div className="nav-icon">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_765)">
              <path d="M10.8267 5C10.8267 4.46957 11.0374 3.96086 11.4125 3.58579C11.7876 3.21071 12.2963 3 12.8267 3C13.3572 3 13.8659 3.21071 14.2409 3.58579C14.616 3.96086 14.8267 4.46957 14.8267 5C15.9751 5.54303 16.9541 6.38833 17.6588 7.4453C18.3634 8.50227 18.7672 9.73107 18.8267 11V14C18.902 14.6217 19.1222 15.2171 19.4695 15.7381C19.8169 16.2592 20.2818 16.6914 20.8267 17H4.82672C5.37166 16.6914 5.83653 16.2592 6.18391 15.7381C6.53129 15.2171 6.75147 14.6217 6.82672 14V11C6.88628 9.73107 7.29002 8.50227 7.99467 7.4453C8.69932 6.38833 9.67831 5.54303 10.8267 5" stroke="#F3F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.82672 17V18C9.82672 18.7956 10.1428 19.5587 10.7054 20.1213C11.268 20.6839 12.0311 21 12.8267 21C13.6224 21 14.3854 20.6839 14.948 20.1213C15.5107 19.5587 15.8267 18.7956 15.8267 18V17" stroke="#F3F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_1_765">
              <rect width="24" height="24" fill="white" transform="translate(0.826721)"/>
              </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {user ? (
          <h1 className='money'> $ <span className='dollars'>{balance.dollars}</span><span className='cents'>.{balance.cents}</span> </h1>
        ) : (
          <p className='noPayments' style={{color: 'white'}}>Loading...</p>
        )}

        <div className="buttons-wrapper">
          <div className="btn-wrapper">
            <button onClick={() => navigate('/receive', { state: {email: email}})}>
              <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.6601 8.16675L8.9934 19.8334" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.99338 9.33325L8.99338 19.8333L19.4934 19.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </button>

            <p className="btn-title"> Receive </p>
          </div>
          <div className="btn-wrapper">
            <button onClick={() => navigate('/send', { state: {email: email}})}>
              <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6601 11.6667C16.9152 11.6667 18.7434 9.8385 18.7434 7.58333C18.7434 5.32817 16.9152 3.5 14.6601 3.5C12.4049 3.5 10.5767 5.32817 10.5767 7.58333C10.5767 9.8385 12.4049 11.6667 14.6601 11.6667Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M24.16 17.5V23.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26.4934 19.8333L24.1601 17.5L21.8267 19.8333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.3267 16.3333H14.2434C14.0886 16.3333 14.0113 16.3333 13.9458 16.3343C9.63002 16.4049 6.14842 19.8866 6.07779 24.2024C6.07672 24.2678 6.07672 24.3452 6.07672 24.4999V24.4999H18.3267" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </button>

            <p className="btn-title"> Send </p>
          </div>
        </div>
      </div>
      
      <div className="payments-content">
        {user && payments && payments.length > 0 ? (
            payments.reverse().map((payment) => (
              <Payment
                key={payment.id}
                onClick={() => navigate('/payment-info', {
                  state: {
                    date:  new Date(payment.id).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    }) + ', ' + new Date(payment.id).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                    address: payment.from || payment.to || 'Unknown',
                    amount: payment.amount,
                    type: payment.type,
                  },
                })}
                title={payment.from || payment.to || 'Unknown'}
                time={new Date(payment.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}                
                type={payment.type}
                amount={{
                  dollars: payment.amount.dollars,
                  cents: payment.amount.cents,
                }} />
            ))
          ) : (
            <p className='noPayments'> No payments found. </p>
          )}
      </div>

      <Footer />
      
    </div>
  );
};

export default Wallet;
