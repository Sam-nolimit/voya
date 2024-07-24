import classNames from 'classnames'
import { capitalizeString } from '../../../utils/functions'


const textMap = {
  inactive: 'text-gray-700',
  sales_rep: 'text-[#F58A07]',
  sales_manage: 'text-[#0F973D]',
  admin: 'text-[#0D6EFD]',
}

const bgMap = {
  inactive: 'bg-gray-300',
  sales_rep: 'bg-[#FEF4E6]',
  sales_manage: 'bg-[#E7F6EC]',
  admin: 'bg-[#F0F6FE]',
}

const Badge = ({ title, status: Status, icon: Icon }) => {
  const status = Status?.toLowerCase()
  return (
    <span
      className={classNames(
        'flex items-center justify-center rounded-full px-2.5 py-0.5 text-xxs font-medium',
        textMap[status],
        bgMap[status]
      )}
    >
      {Icon && <Icon className={classNames('mr-1')} />}
      {capitalizeString(title)}
    </span>
  )
}

export default Badge