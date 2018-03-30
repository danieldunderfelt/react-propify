# React-Propify

*Untested package! No not use! Proof of concept only!*

Propify your render props!

Look in the examples folder for now, until I write some documentation.

## The basic idea

...is to provide a function that takes the render props from whatever component and neatly applies them onto the component you want.

Like this (with `react-apollo`):

```
<div>
  <Query query={ query }>
    { propify(View) }
  </Query>
</div>
```

Then, in `View`:

```
class View extends Component {

  // Tell propify how you want to handle the incoming props
  static mapPropsToProps = props => ({
    message: props.data.hello,
    ...props
  })

  render() {
    const { message, loading } = this.props

    return loading ? 'Loading...' : (
      <div style={{ fontSize: '15em' }}>
        { message }
      </div>
    )
  }
}
```

Prop mapping can also be done in the parent:

```
<div>
  <Query query={ query }>
    { propify(View, props => ({ message: props.data.hello })) }
  </Query>
</div>
```

If you don't map props, the first render prop will be splatted into the component if it's an object (great for Apollo),
or if it's not, assigned to a prop named `context` (in honor of the newly-released React Context feature):

```
render() {
  const { context } = this.props

  return (
    <div style={{ fontSize: '15em' }}>
      { context }
    </div>
  )
}
```

The second argument to `propify` (and a possible value for the `static mapPropsToProps` class property) can be a function
(as seen above), an array with prop names to pick from the first render prop, an object with the prop names to pick from
the first render prop AND how to assign them or a string which will just put the first render prop into a prop called that.

If mapPropsToProps is something else than a function, only the first argument (the first render prop) that
the propify function receives will be taken into account. It's just simpler this way.

Array:
```
<div>
  <Query query={ query }>
    { propify(View, ['the', 'prop', 'names', 'to', 'pick']) }
  </Query>
</div>
```

Object
```
<div>
  <Query query={ query }>
    { propify(View, { nameOfPropInView: 'name of prop on the first render prop (which should be an object)' }) }
  </Query>
</div>
```

String:
```
<div>
  <Query query={ query }>
    { propify(View, 'the_prop_name_in_View') }
  </Query>
</div>
```

## Decorator

And oh yes, `propify` lends itself well to be used as a decorator! In this case, use the `static mapPropsToProps` to customize how `propify` applies the props:

```
@propify
class View extends Component {

  static mapPropsToProps = props => {

    return {
      message: props.data.hello,
      ...props
    }
  }

  render() {
    const { message } = this.props

    return (
      <div style={{ fontSize: '15em' }}>
        { message }
      </div>
    )
  }
}

export default View
```

Then you can just give the View directly to the render propper:

```
<div>
  <Query query={ query }>
    { View }
  </Query>
</div>
```

This is very early and improvement suggestions are welcome!