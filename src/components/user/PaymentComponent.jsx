const PaymentComponent = ({ firstPaymentApprovel }) => {
  let content;
    let notification;

    if (firstPaymentApprovel === 'approved') {
        content = (
            <div>
                <p>Upload your documents here:</p>
                <button>Upload</button>
            </div>
        );
        notification = <div style={{ color: 'green' }}>Approved</div>;
    } else if (firstPaymentApprovel === 'rejected') {
        content = <div>Rejected</div>;
        notification = <div style={{ color: 'red' }}>Rejected by admin</div>;
    } else if (firstPaymentApprovel === 'requested') {
        content = <div>Waiting for admin approval</div>;
        notification = <div style={{ color: 'blue' }}>Requested</div>;
    }

    return (
        <div>
            {notification}
            {content}
        </div>
    );
  };
  
  export default PaymentComponent;