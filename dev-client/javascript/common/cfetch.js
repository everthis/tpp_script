const djson = d => d.json()
const dtext = d => d.text()
export default function cfetch(...args) {
  const resultFormat = args[2] === 'text' ? dtext : djson
  if (
    args[1] &&
    args[1]['method'] &&
    args[1]['method'].toLowerCase() === 'post'
  ) {
    args[1].headers = Object.assign({}, args[1].headers, {
      'Content-Type': 'application/json'
    })
  }
  return fetch(
    args[0],
    Object.assign(
      {
        credentials: 'same-origin'
      },
      args[1]
    )
  ).then(resultFormat)
}
