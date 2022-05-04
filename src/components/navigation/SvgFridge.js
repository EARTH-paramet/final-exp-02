export default function SvgFridge(props) {
  return (
    <div style={{ color: props.color }}>
      <svg
        aria-hidden='true'
        focusable='false'
        data-prefix='fas'
        data-icon='refrigerator'
        class={`svg-inline--fa fa-refrigerator fa-${props.size} icon`}
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 430 412'
      >
        <path
          fill='currentColor'
          d='M325.14,0H107.093c-8.284,0-15,6.716-15,15v96.8H340.14V15C340.14,6.716,333.423,0,325.14,0z M138.648,78.066
			c0,4.971-4.029,9-9,9s-9-4.029-9-9V33.733c0-4.971,4.029-9,9-9s9,4.029,9,9V78.066z'
        />
        <path
          fill='currentColor'
          d='M92.093,397.5c0,8.284,6.716,15,15,15h19.023v5.398c0,7.916,6.418,14.334,14.334,14.334s14.333-6.418,14.333-14.334V412.5
			h122.666v5.398c0,7.916,6.418,14.334,14.334,14.334s14.334-6.418,14.334-14.334V412.5h19.022c8.283,0,15-6.716,15-15V141.8H92.093
			V397.5z M120.648,185.733c0-4.971,4.029-9,9-9s9,4.029,9,9v44.333c0,4.972-4.029,9-9,9s-9-4.028-9-9V185.733z'
        />
      </svg>
    </div>
  )
}
