import { ErrorRequestHandler } from 'express';
import { ValidationError }from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    let errors: ValidationErrors = {};

    err.inner.forEach(error => {
      errors[error.path] = error.errors;
    })

    return res.status(400).json({ messages: 'Validation fails', errors: errors });
  }

  return res.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;