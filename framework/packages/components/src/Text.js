export const A = 'hello'
export const Text = (props) => {
  return <label>{props.text || A}</label>
}