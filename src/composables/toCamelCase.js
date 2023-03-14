export default function toCamelCase(string) {
  let key = string.split("_");

  let camelKey = key.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  camelKey =
    camelKey.join().charAt(0).toLowerCase() +
    camelKey.toString().replaceAll(",", "").slice(1);

  return camelKey;
};