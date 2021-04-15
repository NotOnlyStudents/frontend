import { ErrorMessage } from 'interfaces/errors';

class HTTPRequest implements HTTPRequest {
  readonly baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  readonly url: string;

  constructor(serviceName: string) {
    this.url = `${process.env.NEXT_PUBLIC_BASE_URL}/${serviceName}`;
  }

  async get<T>(params: string = '', headers: HeadersInit = {}): Promise<T> { // Request data
    const req: Response = await fetch(this.url + params, {
      headers: {
        ...this.baseHeaders,
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
    });

    let res: T;

    if (req.status === 200) {
      res = await req.json();
    } else {
      const errorRes: ErrorMessage = await req.json();
      throw new Error(errorRes.message);
    }

    return res;
  }

  async post<T>(data: string = '', headers: HeadersInit = {}): Promise<T> { // Send data to create a resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
        ...headers,
      },
      method: 'POST',
      body: data,
    });

    let res: T;

    if (req.status === 200) {
      res = await req.json();
    } else {
      const errorRes: ErrorMessage = await req.json();
      throw new Error(errorRes.message);
    }

    return res;
  }

  async patch<T>(data: string = '', headers: HeadersInit = {}): Promise<T> { // Send data to partial update a resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
        ...headers,
      },
      method: 'PATCH',
      body: data,
    });

    let res: T;

    if (req.status === 200) {
      res = await req.json();
    } else {
      const errorRes: ErrorMessage = await req.json();
      throw new Error(errorRes.message);
    }

    return res;
  }

  async delete<T>(data: string = '', headers: HeadersInit = {}): Promise<T> { // Delete a specified resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
        ...headers,
      },
      method: 'DELETE',
      body: data,
    });

    let res: T;

    if (req.status === 200) {
      res = await req.json();
    } else {
      const errorRes: ErrorMessage = await req.json();
      throw new Error(errorRes.message);
    }

    return res;
  }

  async put<T>(data: string = '', headers: HeadersInit = {}): Promise<T> { // Send data to update the entire resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
        ...headers,
      },
      method: 'PUT',
      body: data,
    });

    let res: T;

    if (req.status === 200) {
      res = await req.json();
    } else {
      const errorRes: ErrorMessage = await req.json();
      throw new Error(errorRes.message);
    }

    return res;
  }
}

export default HTTPRequest;
