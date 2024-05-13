export class ErrorFromAPI extends Error {
  error_details?: string

  constructor(message: ErrorFromAPIType) {
    super(message.error_msg)
    this.name = 'ErrorFromAPI'
    this.error_details = message.error_details
  }
}

export const APIBadConnection = 'Bad response from API. Please check your network connection'