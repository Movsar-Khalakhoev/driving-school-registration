const inputValidator = (inputRef, errorState, condition, isTried = true) => {
  const [error, setError] = errorState

  const validate = () => {
    const value = inputRef.current.value

    return !condition(value)
  }

  const valueHandler = (_, tried = false) => {
    const isCorrect = validate()

    if (!isCorrect) {
      if (!error) setError(true)
    } else if (error && (isTried || tried)) {
      setError(false)
    }
  }

  return [inputRef, valueHandler, validate, error]
}

export default inputValidator
