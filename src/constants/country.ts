export const getCurrencyForCountry = (countryCode: string) => {
  switch (countryCode) {
    case "SEN":
      return {
        countryCode: "sn-SN",
        currency: "XOF",
      };
    default:
      return {
        countryCode: "sn-SN",
        currency: "XOF",
      };
  }
};
