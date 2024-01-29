import React from "react"

function isThisStringContainOnlyNumbers(value: string) {
  const contientUniquementNombres = /^\d+$/.test(value)

  if (contientUniquementNombres) {
    return true
  }
  return false
}

export default isThisStringContainOnlyNumbers
