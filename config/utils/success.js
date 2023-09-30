import { HttpStatusCode } from 'axios'

export const createResponse = (
  message,
  data = null,
  code = HttpStatusCode.Ok
) => {
  return {
    code,
    data,
    message,
  };
};
