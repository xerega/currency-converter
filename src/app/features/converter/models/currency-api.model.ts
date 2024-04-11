type ResponseStatus = 'success' | 'failed';

export type CurrencyListResponse = {
  status: ResponseStatus;
  currencies: Record<string, string>;
};

export type CurrencyConversionResponse<
  From extends string,
  To extends string
> = {
  status: ResponseStatus;
  base_currency_code: From;
  base_currency_name: string;
  amount: string;
  updated_date: string;
  rates: {
    [K in To]: {
      currency_name: string;
      rate: string;
      rate_for_amount: string;
    };
  };
};
