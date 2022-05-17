
# Problem description
Imagine we have a page with 4 similar inputs, and we want to handle their states

# Solution

## React class based components
```jsx

class Cmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    }

    this.setValue1.bind(this)
    this.setValue2.bind(this)
    this.setValue3.bind(this)
    this.setValue4.bind(this)
  }

  setValue1(value) {
    this.state.value1 = value
  }
  setValue2(value) {
    this.state.value2 = value
  }
  setValue3(value) {
    this.state.value3 = value
  }
  setValue4(value) {
    this.state.value4 = value
  }

  render() {
    return (
      <div>
        <input value={this.state.value1}> onChange={(e) => this.setValue1(e.target.value)} type="text" />
        <input value={this.state.value2}> onChange={(e) => this.setValue2(e.target.value)} type="text" />
        <input value={this.state.value3}> onChange={(e) => this.setValue3(e.target.value)} type="text" />
        <input value={this.state.value4}> onChange={(e) => this.setValue4(e.target.value)} type="text" />
      </div>
    )
  }
}

```


We can generalize the code so that we don't have to write 4 different setValues
```jsx
class Cmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    }

    this.setValue.bind(this)
  }

  setValue(key, value) {
    this.state[key] = value
  }

  render() {
    return (
      <div>
        <input value={this.state.value1}> onChange={(e) => this.setValue('value1', e.target.value)} type="text" />
        <input value={this.state.value2}> onChange={(e) => this.setValue('value2', e.target.value)} type="text" />
        <input value={this.state.value3}> onChange={(e) => this.setValue('value3', e.target.value)} type="text" />
        <input value={this.state.value4}> onChange={(e) => this.setValue('value4', e.target.value)} type="text" />
      </div>
    )
  }
}

```

Moreover we can use for loops to rewrite the render function

```jsx
  render() {
    return (
      <div>
      {[1, 2, 3, 4].map(item => (
        <input 
          value={this.state[`value${item}`] }
          onChange={(e) => this.setValue(`value${item}`, e.target.value)} 
          type="text" />

      ))}
      </div>
    )
  }
```

## Function based components

```jsx

const Component = (props) => {
  const [value1, setValue1] = useState()
  const [value2, setValue2] = useState()
  const [value3, setValue3] = useState()
  const [value4, setValue4] = useState()
  return (
    <div>
      <input type="text" value={value1} onChange={(e) => setValue1(e.target.value)} />
      <input type="text" value={value2} onChange={(e) => setValue2(e.target.value)} />
      <input type="text" value={value3} onChange={(e) => setValue3(e.target.value)} />
      <input type="text" value={value4} onChange={(e) => setValue4(e.target.value)} />
    </div>
  )
}

```

We can use a shared state for all four inputs

```jsx

const Component = (props) => {
  const [state, setState] = useState({})

  const setValue1 = (val) => setState({...state, value1: val})
  const setValue2 = (val) => setState({...state, value2: val})
  const setValue3 = (val) => setState({...state, value3: val})
  const setValue4 = (val) => setState({...state, value4: val})

  return (
    <div>
      <input type="text" value={state.value1} onChange={(e) => setValue1(e.target.value)} />
      <input type="text" value={state.value2} onChange={(e) => setValue2(e.target.value)} />
      <input type="text" value={state.value3} onChange={(e) => setValue3(e.target.value)} />
      <input type="text" value={state.value4} onChange={(e) => setValue4(e.target.value)} />
    </div>
  )
}

```

### Note:
```jsx
setState({...state, val: "test"})
```
Is equivalent to :
```jsx
let newstate = state;
newstate.val = "test"
setState(newstate)
```

We can also use one function for all four setValue functions

```jsx

const Component = (props) => {
  const [state, setState] = useState({})

  const setValue = (id, val) => {
    setState({...state, [`value${id}`]: val})
  }

  return (
    <div>
      <input type="text" value={state.value1} onChange={(e) => setValue(1, e.target.value)} />
      <input type="text" value={state.value2} onChange={(e) => setValue(2, e.target.value)} />
      <input type="text" value={state.value3} onChange={(e) => setValue(3, e.target.value)} />
      <input type="text" value={state.value4} onChange={(e) => setValue(4, e.target.value)} />
    </div>
  )
}

```

### Note:
Dictionary(objects) can be accessed both by using . and []
```jsx
let obj = { test: '1', hello: 'world' }
obj.test === obj['test'] // True
let tt = 'hello'
obj[tt] === obj.hello // True
```
This can also be used when creating a dictionary:
```jsx
let tt = 'hello'
let obj = {test: '1', [tt]: 'world'}
console.log(obj.hello) // 'world'
```

OR


```jsx

const Component = (props) => {
  const [state, setState] = useState({})

  const setValue = (key, val) => {
    setState({...state, [key]: val})
  }

  return (
    <div>
      <input type="text" value={state.value1} onChange={(e) => setValue('value1', e.target.value)} />
      <input type="text" value={state.value2} onChange={(e) => setValue('value2', e.target.value)} />
      <input type="text" value={state.value3} onChange={(e) => setValue('value3', e.target.value)} />
      <input type="text" value={state.value4} onChange={(e) => setValue('value4', e.target.value)} />
    </div>
  )
}

```

We can also use for loops:


```jsx

const Component = (props) => {
  const [state, setState] = useState({})

  const setValue = (key, val) => {
    setState({...state, [key]: val})
  }

  return (
    <div>
      {[1, 2, 3, 4].map(item => (
        <input type="text" value={state[`value${item}`]} onChange={(e) => setValue(`value${item}`, e.target.value)} />
      ))}
    </div>
  )
}

```
