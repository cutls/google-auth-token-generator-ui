const {google} = require('googleapis')
export const handler = async (event, context, callback) => {
    const body = JSON.parse(event.body)
    const cred = process.env.CREDENTIAL
    const credentials = JSON.parse(cred)
    const {client_secret, client_id, redirect_uris} = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
    const token = await oAuth2Client.getToken(body.code)
    callback(null, {
        headers: {
            'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: JSON.stringify(token),
    })
}