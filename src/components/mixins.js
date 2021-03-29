export const validateSize = (val, compName) => {
  const valid =
    val === '' ||
    val === 'mini' ||
    val === 'tiny' ||
    val === 'small' ||
    val === 'medium' ||
    val === 'large' ||
    val === 'big' ||
    val === 'huge' ||
    val === 'massive'

  if (!valid) {
    console.error(`[Vue warn]: Validation error in ${compName}!`)
    console.error('[Vue warn]: prop.size is not valid!')
    throw `Accepted values: tiny | small | medium | large | big | huge | massive`
  }

  return valid
}

// Px & Percentage parser
export const parsePxStyle = (val) => {
  return val.toString().includes('%') || val.toString().includes('px') ? val : `${parseInt(val)}px`
}

// calculate lines in text
export function countLines(target) {
  const style = window.getComputedStyle(target, null)
  let height = parseInt(style.getPropertyValue('height'))
  const font_size = parseInt(style.getPropertyValue('font-size'))
  let line_height = parseInt(style.getPropertyValue('line-height'))
  const box_sizing = style.getPropertyValue('box-sizing')

  if (isNaN(line_height)) {
    line_height = font_size * 1.2
  }

  if (box_sizing == 'border-box') {
    const padding_top = parseInt(style.getPropertyValue('padding-top'))
    const padding_bottom = parseInt(style.getPropertyValue('padding-bottom'))
    const border_top = parseInt(style.getPropertyValue('border-top-width'))
    const border_bottom = parseInt(style.getPropertyValue('border-bottom-width'))

    height = height - padding_top - padding_bottom - border_top - border_bottom
  }
  const lines = Math.ceil(height / line_height)

  return lines
}
