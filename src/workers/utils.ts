export const formatDate = (formatted: string) => {
  const date = new Date(formatted)

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
