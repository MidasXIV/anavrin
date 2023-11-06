import isEmptyDataItem from "./type-gaurds";

const getFormattedSubscriptionPrice = subscription => {
  if (isEmptyDataItem(subscription)) {
    return 0;
  }
  console.log( {
    style: "currency",
    currency: subscription?.prices?.currency,
    minimumFractionDigits: 0
  })
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: subscription?.prices?.currency,
    minimumFractionDigits: 0
  }).format((subscription?.prices?.unit_amount || 0) / 100);

  return price;
};

export default getFormattedSubscriptionPrice;
