const format_expiry = (expiry) => {
  expiry = expiry.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^1([3-9])$/g, '01/$1' // 13 > 01/3 //UPDATED by NAVNEET
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^0\/|0+$/g, '0' // 0/ > 0 and 00 > 0 //UPDATED by NAVNEET
  ).replace(
    /[^\d|^\/]*/g, '' // To allow only digits and `/` //UPDATED by NAVNEET
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );

 return expiry;
}

module.exports.format_expiry = format_expiry;