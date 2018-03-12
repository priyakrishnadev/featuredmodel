const validateContact = values => {
  const errors = {}
  if (!values.name || !/^[a-zA-Z ]{2,}$/i.test(values.name)) {
    errors.name = 'Please provide valid name'
  }
  if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please provide valid email address'
  }
  if (!values.phone || !/^([7-9][0-9]{9})$/i.test(values.phone)) {
    errors.phone = 'Please provide valid phone number'
  }
  if (!values.message) {
    errors.message = 'Please drop your message'
  }
  return errors
}
export default validateContact
