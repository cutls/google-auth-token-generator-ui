document.getElementsByName('type').forEach(
    r => r.addEventListener('change',
        e => {
            document.getElementsByName('scopeList').forEach(
                r => r.classList.add('hide')
            )
            document.getElementById(`${e.target.value}Scopes`).classList.remove('hide')
        }
    )
)
document.querySelectorAll('.scopeLabel').forEach(
    r => {
        console.log('event')
        r.addEventListener('click', e => document.querySelectorAll('.scopeCheck').forEach(ee => { if (ee.value === r.innerHTML) ee.checked = !ee.checked }))
    }
)

document.getElementById('makeUrl').addEventListener('click', async e => {
    const scopes = getScope()
    const cid = await getClientId()
    if (!cid.id) return alert('error to fetch client id')
    const url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=${scopes.join('%20')}&response_type=code&client_id=${cid.id}&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob`
    document.getElementById('blank').setAttribute('href', url)
    document.getElementById('blank').classList.remove('hide')
    alert(`Click "Click here" to auth`)
})
document.getElementById('blank').addEventListener('click', async e => {
    document.getElementById('initial').classList.add('hide')
    document.getElementById('auth').classList.remove('hide')
})
document.getElementById('getToken').addEventListener('click', async e => {
    const code = document.getElementById('code').value
    const promise = await fetch(`/.netlify/functions/token`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
    const json = await promise.json()
    document.getElementById('copy').value = JSON.stringify(json.tokens)
    document.getElementById('prompt').classList.add('hide')
    document.getElementById('copyWrap').classList.remove('hide')
})
document.getElementById('copyCopy').addEventListener('click', async e => {
    const th = document.getElementById('code').value
    navigator.clipboard.writeText(th)
})
async function getClientId() {
    const promise = await fetch(`/.netlify/functions/getClientId`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    return await promise.json()
}
function getScope() {
    const allTypes = document.getElementsByName('type')
    let type = 'youtube'
    for (const typeCk of allTypes) {
        if (typeCk.checked) {
            type = typeCk.value
            break
        }
    }
    const scopes = []
    document.querySelectorAll(`#${type}Scopes .scopeCheck`).forEach(
        ee => { if (ee.checked) scopes.push(encodeURIComponent(ee.value)) }
    )
    return scopes
}