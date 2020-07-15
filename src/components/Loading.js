import * as React from 'react'

const textDefault = 'Loading'

export default function Loading () {
  const [text, setText] = React.useState(textDefault)

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setText((text) => text === `${textDefault}...` ? textDefault : `${text}.`)
    }, 500)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className='container'>
      <p className='text-center'>{text}</p>
    </div>
  )
}