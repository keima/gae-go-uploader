import { Image } from "./models/Image"

const API_HOST = "https://keima-uploader.appspot.com"

export class ApiClient {
  private static _instance: ApiClient

  private constructor() {}

  public static get instance(): ApiClient {
    if (!this._instance) {
      this._instance = new ApiClient()
    }
    return this._instance
  }

  private responseChain = (response: Response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  }

  public async images(): Promise<Image[]> {
    return fetch(API_HOST + "/api/v1/images").then(this.responseChain)
  }

  public async uploadImage(image: File): Promise<any> {
    const formData = new FormData()
    formData.append("imagedata", image)

    return fetch(API_HOST + "/api/upload", {
      method: "POST",
      body: formData,
    }).then(this.responseChain)
  }
}
