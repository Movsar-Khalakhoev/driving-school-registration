import {useState} from 'react'

const useFormValidator = (inputs = []) => {
  const [isTried, setIsTried] = useState(false)
  const elemsErrors = []
  const elemsValues = []

  const tryHandler = func => {
    if (!isTried) setIsTried(true)

    if (!elemsErrors.reduce((acc, isErr) => acc || isErr)) {
      func(...elemsValues)
    }
  }

  const elementHandler = (setValue, setError, condition, idx) => value => {

    const isValid = condition(value)

    if (isValid) {
      setValue(value)
    }

    if (isValid && elemsErrors[idx]) {
      setError(false)
    }

    if (!isValid && !elemsErrors[idx]) {
      setError(true)
    }
  }

  const returnable = inputs.map((input, idx) => {
    const {valueState, errorState, condition} = input

    elemsValues.push(valueState[0])
    elemsErrors.push(errorState[0])
    const handler = elementHandler(valueState[1], errorState[1], condition, [idx])

    return [handler, errorState[0]]
  })
  returnable.push([isTried, tryHandler])
  return returnable
}

export default useFormValidator
