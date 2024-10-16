export function roundToTwoDecimal(number: number) {
    return Math.round(number * 100) / 100;
  }

  export function currencyFormatter(currency:any){
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', 
    });
    return formatter.format(currency);
  }