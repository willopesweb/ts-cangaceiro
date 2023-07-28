export default class HttpService {
  private handleErrors(res: Response): void {
    if (!res.ok) throw new Error(res.statusText);
  }

  async get(url: string): Promise<any> {
    const response = await fetch(url);
    this.handleErrors(response);
    return await response.json();
  }
}
