export default class HttpService {
    handleErrors(res) {
        if (!res.ok)
            throw new Error(res.statusText);
    }
    async get(url) {
        const response = await fetch(url);
        this.handleErrors(response);
        return await response.json();
    }
}
//# sourceMappingURL=HttpService.js.map