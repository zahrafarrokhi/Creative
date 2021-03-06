
## Login
![Login](../../../screenshots/Login.png)

## Confirm
![Confirm](../../../screenshots/Confirm.png)


## VerificationInput

[verification-code](https://www.npmjs.com/package/react-verification-input)

```
npm i react-verification-input
```
## state login
1. state: email or phone number
```
 const [state, setState] = useState("email");
```

2. value: string that user has input
```
 const [value, setValue] = useState();
```



## radio button group on login page
```jsx
import React, { useState } from "react";
import styles from "../../styles/Login.module.scss";

function Login() {
  const [state, setState] = useState("email");
  return (
    <div
      className={`d-flex flex-column  align-items-center w-100 justify-content-center ${styles.bg} `}
    >
      <form action=" " className={`d-flex flex-column w-100 ${styles.mdl}`}>
        <div
          className={`d-flex align-items-center justify-content-center p-4 ${styles.mdl2}`}
        >
          <div
            className={`btn-group d-flex ${styles.btngrp}`}
            dir="rtl"
            role="group"
            aria-label="Status button group"
            onChange={(e) => {
              console.log(e.target.value);
              setState(e.target.value);
            }}
          >
            <div className="p-0 m-0 d-flex flex-grow-1 align-items-center justify-content-center">
              <input
                dir="rtl"
                type="radio"
                className="btn-check"
                name="statusbutton"
                id="btnradiophonenumber"
                onChange={() => ({})}
                value={"phonenumber"}
              />
              <label
                className={`${styles.btngrpbtn} ${
                  state === "phonenumber" ? styles["btngrpbtn-active"] : ""
                } `}
                htmlFor="btnradiophonenumber"
              >
                تلفن‌همراه
              </label>
            </div>

            <div className="p-0 m-0 d-flex flex-grow-1 align-items-center justify-content-center">
              <input
                dir="rtl"
                type="radio"
                className="btn-check"
                name="statusbutton"
                id="btnradioemail"
                onChange={() => ({})}
                value={"email"}
              />
              <label
                className={`${styles.btngrpbtn}  ${
                  state === "email" ? styles["btngrpbtn-active"] : ""
                }`}
                htmlFor="btnradioemail"
              >
                ایمیل
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


export default Login;

```

```scss

@import "colors";
@import "bootstrap-imports";

.slow-transition {
  -webkit-transition: all 0.3s 0.1s ease-in-out;
  -moz-transition: all 0.3s 0.1s ease-in-out;
  -o-transition: all 0.3s 0.1s ease-in-out;
  transition: all 0.3s 0.1s ease-in-out;
}

.bg {
  // background-color: blue;
  position: relative;
}

.mdl {
  // background-color: red;
  position: absolute;
  top: 2%;
  left: 0;
}



.btngrp {
  width: 240px !important;
  height: 40px !important;
  padding: 5px;
  background-color: $text-secondary;
  // background-color: red;

  @include media-breakpoint-up(md) {
    padding: 0px;
    height: 50px !important;
    width: 327px !important;
    border: 1px solid $secondary;
    background-color: $text-secondary;
    // background-color: red;
  }
  border-radius: 10px;
  overflow: hidden;
  &:first-child {
    right: 0;
  }
  &:last-child {
    left: 0;
  }
  @extend .slow-transition;
}

.btngrpbtn {
  height: 30px !important;
  width: 110px !important;
  text-align: center;
  background-color: $background;
  // background-color: yellow!important;
  color: $text-secondary-dark;
  // padding: 2px 0 2px;
  // margin: 0px;
  // margin-left: 1px;
  @include media-breakpoint-up(md) {
    height: 50px !important;
    width: 162px !important;
    padding: 11px 0 12px;
    background-color: $white;
    margin-left: 1px;
  }
  @include media-breakpoint-down(xsm) {
    width: 97px !important;
  }
  border-radius: 10px;
  border-radius: 10px;
  position: relative;
  top: 0px;
  @extend .slow-transition;
}

.btngrpbtn-active {
  width: 110;
  background-color: $white;
  border-radius: 5px;

  @include media-breakpoint-up(md) {
    color: $text-white;
    background-color: $secondary;
    border-radius: 10px;
  }
}


```
## confirm page(Timer)
In order to create a countdown timer we need to use setInterval and change our time(which is a state) every second
```jsx
const timerRef = useRef(null); // kind of like a pointer to a value
const [time, setTime] = useState(120)
```
We use `timerRef` to save the setInterval value so that we can erase it later.

Refs in js are like pointers, in order to access their value we use `.current`.

```jsx
const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current); // Clear previous set interval (if exists)
    const timerInterval = setInterval(() => { // Create a new interval
      if (time > 0) setTime((t) => (t > 0 ? t - 1 : t)); 
      else clearInterval(timerRef.current); // Clear the interval if time === 0
    }, 1000);
    timerRef.current = timerInterval; // Save timerInterval to timerRef so that it can be erased later
  };
```

### setState syntax with function:
Usually we use `setState(newvalue)` to update our state.
But if our current state depends on its previous value we can use the following syntax
```jsx
setState((previous_value) => {
  const new_value = previous_value * 2
  return new_value
});

const getNewValue = (previous) => (previous - 1)
setState(getNewValue)
```

### useEffect hook to stop/start timer
```jsx
 useEffect(() => {
   // use effect body is componentDidMount
   // it runs when component initially renders in page or when page loads for the first time
    startTimer(); // Start time on page load
    return () => { // return should be a function
      // use effect return body is componentDidUnmount
      // it runs when component gets removed from the page or page gets closed
      if (timerRef.current) clearInterval(timerRef.current); // if page is closing and timer is running, stop it
    };
  }, []);

```
# Splash Screen

[framer](https://www.framer.com/docs/introduction/)

```
npm install framer-motion
```

## Components:

* Page: a component to render each page of carousel, it uses `renderPage` prop to load page data 
* VirtualizedPage: Component responsible for rendering pages and handlign drag actions

`renderPage` is passed to VirtualizedPage as children and then passed to page.
its a function that takes an index and render the content for that specific index.

* NotificationCarousel: Responsible for splash screen styles and carousel page data

## Animation
For a specific index, we move all elements to `-index * width` and then use left to push the elements in to page.
We do this in order to have a consistant animation when index chagnes.

* calculateNewX: calculates `-index * width` when index changes
* handleEndDrag:
This event has an dragEvent which consist of two variables, each of which is a 2D vector:
  * offset: the amount page is dragged in one direction
  * velocity: the speed of drag

We will move to next/previous page if the page is dragged at lease a quarter of the width of the carousel, and the velocity in the x axis is greater than that of the y axis.


The following code is used to animate pages when index changes, it changes the value of x to `calculateNewX` for the new index with the given transition.
Then we call controls.stop to stop the animation when page is unmounting.
```jsx
 React.useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    // const controls = animate(y, calculateNewY(), transition);
    return controls.stop;
  }, [index]);
```


## Only showing the splash screen on first view
We use localStorage to check whether the user has already viewed the splash screen.
Then after viewing all pages, we set `seen_splash` in localStorage to 1

```jsx
    localStorage.getItem("seen_splash") !== "1"
    ...            
    localStorage.setItem("seen_splash", 1);
```

Keep in mind that localStorage is in the browser and therefore doesn't exist when nextjs is trying to build this component, so we need to disable ssr for this component when importing it:
```js
import dynamic from 'next/dynamic';
...

  const SplashScreen = dynamic(() => import('../components/SplashScreen'), {ssr: false})

```





