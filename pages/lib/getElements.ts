export default class getElements {
  url: URL;

  constructor(serviceName: string) {
    this.url = new URL(`https://${process.env.baseURL}/${serviceName}`);
  }

  async getJSONAsRes(method?: string, body?: string): Promise<any> {
    let req = null;
    switch (method) {
      case "GET":
        req = await fetch(this.url.href, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        break;
      default:
        req = await fetch(this.url.href, {
          body: body,
          headers: {
            "Content-Type": "application/json",
          },
          method,
        });
        break;
    }
    const data = await req.json();
    return data;
  }
}
