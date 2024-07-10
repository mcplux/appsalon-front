type StringOrNumber = string | number

export const formatCurrency = (price:StringOrNumber):string => {
  const formatedCurrency = Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatedCurrency
}

// This function receives a date in the format 'dd/mm/yyyy' and returns it in the format 'yyyy-mm-dd'
export const convertToISO = (date:string):string => {
  const dateArray = date.split('/')
  const ISODate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`).toISOString().split('T')[0]

  return ISODate
}

// This function receives a date in the format 'yyyy-mm-ddThh:mm:ss' and returns it in the format 'dd/mm/yyyy'
export const convertToDDMMYYYY = (date:string):string => {
  const dateArray = date.split('T')[0].split('-')
  const formattedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`

  return formattedDate
}
