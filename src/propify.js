import React from 'react'
import pick from 'lodash/pick'
import get from 'lodash/get'
import reduce from 'lodash/reduce'

function propsToProps(...props) {
  const prop = props[ 0 ]
  
  if( !prop ) return {}
  
  if( prop !== null && typeof prop === 'object' ) {
    return prop
  }
  
  return { context: prop }
}

function getMountableComponent(Component, props = {}) {
  return typeof Component === 'function' ? <Component { ...props } /> : React.cloneElement(Component, props)
}

export const propify = (Component, mapPropsToProps = propsToProps) => (...args) => {
  
  // Why
  if( args.length === 0 ) {
    const Comp = getMountableComponent(Component)
    return <Comp />
  }
  
  const propMapper = get(Component, 'mapPropsToProps', get(Component, 'type.mapPropsToProps', mapPropsToProps))
  
  // The default. Call the map function if it is a function.
  if( typeof propMapper === 'function' ) {
    const Comp = getMountableComponent(Component, propMapper(...args))
    return Comp
  }
  
  let props
  const firstArg = args[0]
  
  // The rest assume that the firstArg is an object. Check that that is the case.
  if(!propMapper || !firstArg) {
    props = { context: firstArg }
    
  } else if( Array.isArray(propMapper) ) {
    props = pick(firstArg, propMapper)
    
  } else if( propMapper !== null && typeof propMapper === 'object' ) {
    props = reduce(propMapper, (pickedProps, propToPick, propName) => {
      pickedProps[ propName ] = get(firstArg, propToPick, null)
      return pickedProps
    }, {})
  
  } else if( typeof propMapper === 'string') {
    props = { [propMapper]: firstArg }
  }
  
  return getMountableComponent(Component, props)
}