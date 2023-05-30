type Token = {
  ticker: string;
  image: string;
  name?: string;
  network?:string;
  tickerWithNetwork?:string;
  address?: string;
  chainId?: number;
  decimals?: number;
  network_code_letsExchange?:string;
  id?:number;
};

export default Token;
