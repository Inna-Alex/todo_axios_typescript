type ErrorFromAPIType = Error & {
  error_msg: string
  error_details?: string
}