export const handler = async (event, context, callback) => {
    const cred = process.env.CREDENTIAL
    const auth = JSON.parse(cred)
    const cid = auth.installed.client_id
    callback(null, {
        headers: {
            'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: JSON.stringify({ id: cid }),
    })
}