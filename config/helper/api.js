import { NextRequest, NextResponse } from 'next/server'

import { validateMiddleware } from '../middleware/validateSchema'
import { errorHandler } from './'

export { apiHandler }

function apiHandler(handler) {
  const wrappedHandler = {};
  const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  // wrap handler methods to add middleware and global error handler
  httpMethods.forEach((method) => {
    if (typeof handler[method] !== 'function') return;

    wrappedHandler[method] = async (req, ...args) => {
      try {
        // monkey patch req.json() because it can only be called once
        const json = await req.json();
        req.json = () => json;
      } catch {}

      try {
        // global middleware
        await validateMiddleware(req, handler[method].schema);

        // route handler
        const responseBody = await handler[method](req, ...args);
        return NextResponse.json(responseBody || {});
      } catch (err) {
        // global error handler
        return errorHandler(err);
      }
    };
  });

  return wrappedHandler;
}
