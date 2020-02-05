import React from 'react';

const PromoDetails = ({ detailname, price }) => (
    <div className="details">
       Secure your <span className="highlight">{ detailname }</span> spot with an initial payment of only <span className="highlight">${price}</span>
    </div>
);

export default PromoDetails;
