import crypto from 'crypto'

export const generateSignature = (params: any, secretKey: string) =>  {
  const sortParams = Object.fromEntries(
    Object.entries(params).sort()
  )
  const paramsToString: string = `${Object.values(sortParams).join('{up}')}{up}${secretKey}`

  return crypto
    .createHash('sha256')
    .update(paramsToString, 'utf-8')
    .digest('hex')
}