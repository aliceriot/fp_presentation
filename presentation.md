# What is functional programming?

- function oriented
- pure
- composition oriented
- declarative

# It isn't

- map / reduce / filter (not just these things anyway!)
- an absolute category (we can mix paradigms)
- esoteric / academic
- very difficult!


# Purity


# Purity

```javascript
let s1 = "muh string yyeah"
let s2 = "muh other string"

const hamming = () => {
  let distance = 0
  for (let i = 0; i < s1.length; i++) {
    if ( s1[i] !== s2[i] ) {
      distance++
    }
  }
  return distance
}
```


# Purity

```javascript
let s1 = "muh string yyeah"
let s2 = "muh other string"

const hamming = () => {
  let distance = 0
  for (let i = 0; i < s1.length; i++) {
    if ( s1[i] !== s2[i] ) {
      distance++
    }
  }
  return distance
}

const hamming = (s1, s2) => {
  let distance = 0
  for (let i = 0; i < s1.length; i++) {
    if ( s1[i] !== s2[i] ) {
      distance++
    }
  }
  return distance
}
```


# Composition


# Composition

```javascript
const hamming = (s1, s2) => (
  s1.split('').reduce((acc, char, idx) => (
    char === s2[idx] ? acc : acc + 1
  ), 0)
)
```


# Composition

```javascript
const hamming = (s1, s2) => (
  s1.split('').reduce((acc, char, idx) => (
    char === s2[idx] ? acc : acc + 1
  ), 0)
)

const zip = (s1, s2) => (
  s1.split('').map((char, idx) => [char, s2[idx]])
)

const hamming = (s1, s2) => (
  zip(s1, s2).reduce((acc, ([c1, c2])) => (
    c1 === c2 ? acc : acc + 1
  ), 0)
)
```


# Composition

```javascript
const hamming = (s1, s2) => (
  zip(s1, s2).reduce((acc, ([c1, c2])) => (
    c1 === c2 ? acc : acc + 1
  ), 0)
)
```


# Composition

```javascript
const hamming = (s1, s2) => (
  zip(s1, s2).reduce((acc, ([c1, c2])) => (
    c1 === c2 ? acc : acc + 1
  ), 0)
)
```

```
zip s1 s2 | pairwiseDifferences
```


# Composition

zip s1 s2 | pairwiseDifferences

```javascript
const hamming = R.pipe(
  R.zip,
  R.reduce((acc, [c1, c2]) => c1 === c2 ? acc : acc + 1, 0),
)
```


# Composition

zip s1 s2 | pairwiseDifferences

```javascript
const hamming = R.pipe(
  R.zip,
  R.reduce((acc, [c1, c2]) => c1 === c2 ? acc : acc + 1, 0),
)

const hamming = R.compose(
  R.reduce((acc, [c1, c2]) => c1 === c2 ? acc : acc + 1, 0),
  R.zip
)
```


# Composition

zip s1 s2 | pairwiseDifferences

```javascript
const hamming = R.compose(
  R.reduce((acc, [c1, c2]) => c1 === c2 ? acc : acc + 1, 0),
  R.zip
)

const hamming = (s1, s2) => {
  let distance = 0
  for (let i = 0; i < s1.length; i++) {
    if ( s1[i] !== s2[i] ) {
      distance++
    }
  }
  return distance
}
```


# Functional Style

# Currying

```javascript
let add = (x, y) => x + y
```


# Functional Style

# Currying

```javascript
let add = (x, y) => x + y

let addOne = x => x + 1
```


# Functional Style

# Currying

```javascript
let add = (x, y) => x + y

let addOne = x => x + 1

let addOne = x => add(1, x)
```


# Functional Style

# Currying

```javascript
let add = x => y => x + y

let addOne = add(1)

addOne(2) // => 3
```


# Functional Style

# Currying

```javascript
let add = x => y => x + y

let addOne = add(1)

addOne(2) // => 3

add(2)(3) // => 5
```


# Functional Style

# Currying

```javascript
let add = R.curry((x, y) => x + y)

let addOne = add(1)

addOne(2) // => 3

add(2,3) // => 5
```


# Functional Style

# Pointfree style

```javascript
// (a -> b) -> List a -> List b
R.map

R.map(x => String(x), [1,2,3]) // ['1', '2', '3']
```


# Functional Style

# Pointfree style

```javascript
// (a -> b) -> List a -> List b
R.map

R.map(x => String(x), [1,2,3]) // ['1', '2', '3']

const stringify = xs => R.map(x => String(x), xs)
```


# Functional Style

# Pointfree style

```javascript
// (a -> b) -> List a -> List b
R.map

R.map(x => String(x), [1,2,3]) // ['1', '2', '3']

const stringify = xs => R.map(x => String(x), xs)

// equivalent to

const stringify = R.map(x => String(x))
```


# Monads

```javascript
// data Maybe a = Nothing | Just a

let just = Just(3)

let nuthin = Nothing

S.map(addOne, just) // Just(4)

S.map(addOne, Nothing) // Nothing
```
