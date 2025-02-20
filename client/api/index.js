const url = `${process.env.OWN_API_URL}/api/api.php`

async function request (body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await response.json()
  console.log(json)
  return json
}

export async function get (table, id = null, columns = []) {
  return await request({
    command: 'get',
    table: table,
    id: id,
    columns: columns
  })
}

export async function search (term) {
  return await request({
    command: 'search',
    term: term
  })
}

export async function update (table, entry) {
  return await request({
    command: 'update',
    table: table,
    entry: entry
  })
}

const api = {
  get,
  search,
  update
}

export default api
