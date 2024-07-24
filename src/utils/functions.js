export const cellType = {
    STRING: 'string',
    DOUBLE_STRING: 'double-string',
    ACTION: 'action',
    STRING_BOLD: 'string-bold',
    STRING_BADGE: 'string-badge',
    BADGE: 'badge',
    SELECTION: 'selection',
    DOTTED_BADGE: 'dotted-badge',
    EXPANDER: 'expander',
    IMAGE: 'image',
    MOD_ACTION: 'mod-action',
  }

  export const getStatus = (name) => {
    switch (name?.toLowerCase()) {
      case 'sales manager':
        return 'sales_manage'
      case 'sales representative':
        return 'sales_rep'
      case 'administrator':
        return 'admin'
      case 'initiated':
      case 'active':
        return 'inactive'
      default:
        return undefined
    }
  }

  export const capitalizeString = (str) => {
    if (!str) return ''
  
    return `${str[0].toUpperCase()}${str.slice(1)}`
  }