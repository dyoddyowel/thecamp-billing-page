import React from 'react';

const PromoDetails = ({ detailname, price }) => (
    <div className="details">
       We are excited to announce our brand new <span className="highlight">{ detailname }</span> for only <span className="highlight">${price}</span>
    </div>
);

export default PromoDetails;
