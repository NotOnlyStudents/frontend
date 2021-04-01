class HTTPRequest {
  readonly baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  readonly url: string;

  constructor(serviceName: string) {
    this.url = `${process.env.baseURL}/${serviceName}`;
  }

  async get<T>(params: string = ''): Promise<T> { // Request data
    const req: Response = await fetch(this.url + params, {
      headers: {
        ...this.baseHeaders,
        'Access-Control-Allow-Origin': '*',
      }
    });

    const res: T = await req.json();

    return res;
  }

  async post<T>(data: string = ''): Promise<T> { // Send data to create a resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
      },
      method: "POST",
      body: data,
    });

    const res: T = await req.json();

    return res;
  }

  async patch<T>(data: string = ''): Promise<T> { // Send data to partial update a resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
      },
      method: "PATCH",
      body: data,
    });

    const res: T = await req.json();

    return res;
  }

  async delete<T>(data: string = ''): Promise<T> { // Delete a specified resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
      },
      method: "DELETE",
      body: data,
    });

    const res: T = await req.json();

    return res;
  }

  async put<T>(data: string = ''): Promise<T> { // Send data to update the entire resource
    const req: Response = await fetch(this.url, {
      headers: {
        ...this.baseHeaders,
      },
      method: "PUT",
      body: data,
    });

    const res: T = await req.json();

    return res;
  }

}

export default HTTPRequest;
