export const formatCurrency = (price:string):string => {
  const formatedCurrency = Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatedCurrency
}
