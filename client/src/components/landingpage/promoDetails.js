import React from 'react';

const PromoDetails = ({ detailname, price }) => (
    <div className="details">
       <span className="highlight">${price}</span> for the <span className="highlight">{ detailname }</span> program will get you:
    </div>
);

export default PromoDetails;
