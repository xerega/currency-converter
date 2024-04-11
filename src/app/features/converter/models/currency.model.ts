export type Currency = {
  isoCode: string;
  name: string;
};

export type CurrencyPopularity = {
  currency: Currency;
  popularity: number;
};
