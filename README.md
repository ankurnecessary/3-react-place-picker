# 3-react-place-picker

A react practice project mainly for useEffect() hook. We saw a better **modal** component implementation in this project.

Working with:

1. components
2. useState()
3. Tailwind css - [Practice Project 2 - react-project-management]
4. useRef()
5. forwardRef()
6. useImperativeHandle()
7. createPortal()
8. createContext()
9. useContext()
10. <React.StrictMode>
11. Children prop
12. Using rest operator while using component tag.
13. useReducer()
14. useEffect() - with blank dependency array will fire only once on first render of the component.
15. useEffect() - with dependency array will fire on first render of the component and every time value of the variables in dependency array changes.
16. useEffect() - with a return function inside useEffect() function. The function returned will fire when the related component dismounts. That is why it is also called clean up function.
17. useCallback() - Whenever we wrap any function inside the useCallback() it stops getting recreated again and again when a component rerenders, if the dependency array is blank. If not then the function in useCallback() will be recreated when the value of any of the dependency change.
18. In the dependency array of useEffect() and useCallback() function we put props, state variables or other functions that are dependent on the state variables like context values and other functions. You will not add the state updating function of useState() directly.

[Eslint configuration - Best linting configuration is to use "format on save" and don't use "formatting option of ES Lint"](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8231814#questions/20789494)

[This link helps in setting up the most important rule that will help in highlighting the unused variables and highlighting the undeclared variable usage](https://www.dhiwise.com/post/essential-eslint-rules-for-react#1-react-jsx-uses-react-)

[Refs vs State Values](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/39836310#questions)

In the code below we are iterating over an array of ids i.e. **storedIds** and on the basis of ids we are fetching places. Finally, we are storing those places in an array and assigning it to variable **storedPlaces**.

```Javascript
const storedPlaces = storedIds.map((id) => {
  return AVAILABLE_PLACES.find((place) => place.id === id);
});
```
