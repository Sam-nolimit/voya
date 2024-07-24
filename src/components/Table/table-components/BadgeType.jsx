import React from 'react'

import Badge from './Badge'
// import { getStatus } from '../../../types/coon'
import { getStatus } from '../../../utils/functions'

const BadgeType = React.memo(({ value }) => {
  if (!value) return <div />

  return <Badge status={getStatus(value)} title={value} />
})
export default BadgeType