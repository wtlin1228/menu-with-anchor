# Menu with Anchor

## User Story

- Activate and scroll corresponding category chip when scrolling the menu up and down.

  ![demo scroll menu](https://media.giphy.com/media/RdYfIIAupS8HTLZHNa/giphy.gif?cid=790b7611f4714a641acb102680bb806b60e5c59b588e893c&rid=giphy.gif&ct=g)

- Reach the bottom

  If clicked a category chip -> always activate the clicked category chip

  If not -> Always activate the last category chip

  ![demo scroll to bottom](https://media.giphy.com/media/U9bPP39OcuIetaYaMx/giphy.gif?cid=790b76115cabc6c4f2c630c282400ca1939822680ad9b74e&rid=giphy.gif&ct=g)

## Performance

- Optimize performance to 60 FPS

  Performance Record under 6x slowdown CPU (with 8 categories and each category has 10 items)

  <img src="./demo/demo-performance-record.png" style="height: 600px">

## Tech Stack

- React
- TypeScript
- tailwindcss
- Intersection Observer API -> To observe whether categories and footer are in view or not.
- requestAnimationFrame -> To smoothly scroll vertically and horizontally.
- RxJS -> To wrap intersection observer entries into an observable for handling complicated asynchronous behavior.
