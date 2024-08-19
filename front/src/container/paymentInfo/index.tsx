import './index.css';
import { useLocation } from 'react-router-dom';

import Header from '../../component/statusBar';
import Nav from '../../component/navBar';
import Footer from '../../component/footer';

const PaymentInfo = () => {
  const location = useLocation();
  const { date, address, amount, type } = location.state || {};

  return (
    <div className='container payment-container'>
      <Header color={'black'} />
      <Nav />

      <h1 className='relative-title transaction-title'> Transaction </h1>
      
      <div className="singlePayment-content">
        {type === '+' ? (
          <p className="payment-amount" style={{ color: 'green' }}> <span className='dollars'> {type}${amount.dollars}</span><span className='cents'>.{amount.cents}</span></p>
        ) : (
          <p className="payment-amount" style={{ color: 'red' }}> <span className='dollars'> {type}${amount.dollars}</span><span className='cents'>.{amount.cents}</span></p>
        )}

        <div className="singlePaymentData-wrapper">
          <div className="data-line">
            <p className="line-p">Date</p>
            <p className="data-p">{ date }</p>
          </div>
          <div className="data-line">
            <p className="line-p">Address</p>
            <p className="data-p">{address}</p>
          </div>
          <div className="data-line">
            <p className="line-p">Type</p>
            {type === '+' ? (
              <p className="data-p"> Recive </p>
            ) : (
              <p className="data-p"> Sent </p>
            )}
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentInfo;
