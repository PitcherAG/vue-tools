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
export const parsePxStyle = val => {
    return val.toString().includes('%') || val.toString().includes('px') ? val : `${parseInt(val)}px`
}
