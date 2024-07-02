type StringOrNumber = string | number

export const formatCurrency = (price:StringOrNumber):string => {
  const formatedCurrency = Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatedCurrency
}
