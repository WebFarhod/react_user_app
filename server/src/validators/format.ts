import { ValidationError } from "class-validator";

const formatErrors = (errors: ValidationError[]) => {
  return errors.flatMap((error) => {
    return Object.values(error.constraints || {});
  });
};

const handleValidationErrors = (errors: ValidationError[]) => {
  return formatErrors(errors);
};

export { handleValidationErrors };
