import * as React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

export default function CustomLink ({ to, value }) {
  const match = useRouteMatch({
    path: to
  })

  return (
    <li style={{ fontWeight: match ? 900 : 'normal' }}>
      <Link to={to}>
        {value.toUpperCase()}
      </Link>
    </li>
  )
}