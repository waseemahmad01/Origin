export const validate = async (schema, object) => {
  try {
    await schema.validate(object, {abortEarly: false});
  } catch (err) {
    const validationErrors = {};
    err.inner.forEach(err => {
      validationErrors[err.path] = err.message;
    });
    return validationErrors;
  }
};
