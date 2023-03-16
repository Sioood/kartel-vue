// get id from api url such http://127.0.0.1:8000/v2/people/user/670
function getId(url) {
  if (!url) {
    return null
  }

  const split = url.split("/");
  const id = split[split.length - 1];
  return Number(id);
}

export {
  getId
}