export const toUrl = (name) => name.toLowerCase().split(' ').join('-')
export const toCapitalize = (value) => `${value[0].toUpperCase()}${value.substr(1)}`

export const convertDate = (date) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const formatDay = day < 10 ? `0${day}` : day

  const month = newDate.getMonth() + 1;
  const formatMonth = month < 10 ? `0${month}` : month


  return `${formatDay}.${formatMonth}.${newDate.getFullYear()}`
} 