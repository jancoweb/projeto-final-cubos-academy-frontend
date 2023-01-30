export default function formatValue(value) {

    value = Number(value);
    let formatedValue = (value / 100).toFixed(2);
    formatedValue = formatedValue.replaceAll('.', ',');


  return formatedValue;
}
