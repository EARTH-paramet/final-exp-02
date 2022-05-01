export default function TextInput(props) {
  return (
    <div className='mb-3'>
      <label className='form-label fw-bold'>{props.topic}</label>
      <input
        type={props.type}
        defaultValue={props.value}
        className='form-control'
        style={{ borderRadius: '20px', border: '1px solid rgb(255 195 0)' }}
      />
    </div>
  )
}
