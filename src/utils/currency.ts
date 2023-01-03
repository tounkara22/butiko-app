import { getCurrencyForCountry } from "../constants/country";

/**
 *
 * @param amount
 * @param country
 * @returns
 */
export const formatToCurrency = (amount: number, country = "SEN") => {
  const ccyParams = getCurrencyForCountry(country);
  const formatter = new Intl.NumberFormat(ccyParams.countryCode, {
    style: "currency",
    currency: ccyParams.currency,
  });
  return formatter.format(amount);
};
