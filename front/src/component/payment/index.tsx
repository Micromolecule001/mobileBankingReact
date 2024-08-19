import React from 'react';
import './index.css'

interface PaymentProps {
  onClick?: () => void;
  title: string;
  time: string;
  type: string;
  amount: {
    dollars: number;
    cents: string;
  };
}

const Payment: React.FC<PaymentProps> = ({ onClick, title, time, type, amount}) => {
  return <div className='payment-wrapper' onClick={onClick}>
    <div className="paymentData-wrapper">
      <div className="payment-icon">
        {type === '-' ? (
          <div className="custom-icon">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_8_443)">
              <path d="M12.6816 11.3235C14.8908 11.3235 16.6816 9.53263 16.6816 7.32349C16.6816 5.11435 14.8908 3.32349 12.6816 3.32349C10.4725 3.32349 8.68164 5.11435 8.68164 7.32349C8.68164 9.53263 10.4725 11.3235 12.6816 11.3235Z" stroke="#939199" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.68164 21.3235V19.3235C6.68164 18.2626 7.10307 17.2452 7.85321 16.4951C8.60336 15.7449 9.62077 15.3235 10.6816 15.3235H14.6816C15.7425 15.3235 16.7599 15.7449 17.5101 16.4951C18.2602 17.2452 18.6816 18.2626 18.6816 19.3235V21.3235" stroke="#939199" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_8_443">
              <rect width="24" height="24" fill="white" transform="translate(0.681641 0.323486)"/>
              </clipPath>
              </defs>
            </svg>
          </div>
        ) : type === '+' && title === 'Coinbase' ? (
          <div className="custom-icon">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83501 4.04404C11.9874 4.04404 13.6951 5.35105 14.3434 7.29508H18.6816C17.8954 3.13928 14.4117 0.323486 9.86981 0.323486C4.71186 0.323486 0.681641 4.17854 0.681641 9.34062C0.681641 14.5027 4.61004 18.3235 9.86981 18.3235C14.3099 18.3235 17.8619 15.5077 18.6481 11.3176H14.3434C13.7286 13.2617 12.0209 14.6029 9.86852 14.6029C6.89645 14.6029 4.81368 12.3569 4.81368 9.34062C4.81496 6.29007 6.86423 4.04404 9.83501 4.04404Z" fill="#0052FF"/>
            </svg>
          </div>
        ) : (
          <div className="custom-icon">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.86117 5.68393C7.86117 4.9125 8.51629 4.61579 9.60133 4.61579C11.1572 4.61579 13.1226 5.07074 14.6785 5.88173V1.23338C12.9793 0.580629 11.3005 0.323486 9.60133 0.323486C5.44542 0.323486 2.68164 2.42019 2.68164 5.92129C2.68164 11.3806 10.4612 10.5103 10.4612 12.8641C10.4612 13.774 9.64227 14.0707 8.49581 14.0707C6.7966 14.0707 4.62652 13.3982 2.90684 12.4883V17.196C4.81077 17.9872 6.73518 18.3235 8.49581 18.3235C12.7541 18.3235 15.6816 16.2861 15.6816 12.7455C15.6612 6.85096 7.86117 7.89931 7.86117 5.68393Z" fill="#635BFF"/>
            </svg>
          </div>
        )}
      </div>

      <div className="text-wrapper">
        <h4 className="payment-title"> {title} </h4>
        <p className="payment-description">
          {time} 

          {' - '}

          {type === '+' 
            ? (<span> Receipt </span>)
            : (<span> Sending </span>)
          }
        </p>
      </div>
    </div>

    <div className="amount-wrapper">
      {type === '+' ? (
        <p className="amount" style={{ color: 'green' }}> <span className='dollars'> {type}${amount.dollars}</span><span className='cents'>.{amount.cents}</span></p>
      ) : (
        <p className="amount" style={{ color: 'red' }}> <span className='dollars'> {type}${amount.dollars}</span><span className='cents'>.{amount.cents}</span></p>
      )}
    </div>
  </div>
};

export default Payment;
