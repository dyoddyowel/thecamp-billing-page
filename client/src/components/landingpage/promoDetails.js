import React from 'react';

const PromoDetails = ({ detailname, price }) => (
    <div className="details">
        For <span className="highlight">${price}</span> of the <span className="highlight">{ detailname }</span> program, you'll receive:
    </div>
);

export default PromoDetails;