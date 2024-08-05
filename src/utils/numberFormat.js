const numberFormat = (total) => {
  var formatter = new Intl.NumberFormat("en-US", {
    currency: "USD", // 2,500
   /* style: "currency"  $2,500.00 */
  });
  return formatter.format(total);
};

export default numberFormat ;
