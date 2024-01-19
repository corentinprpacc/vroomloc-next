function currentDateTimestamp() {
  const currentDate = new Date()
  const uniqueTimestamp = currentDate.getTime()

  const uniqueTimestampAsString = uniqueTimestamp.toString()

  return uniqueTimestampAsString
}

export default currentDateTimestamp
