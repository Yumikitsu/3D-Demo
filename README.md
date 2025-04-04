# 3D Demo - TypeScript + Three.js

## Setup project
- Open up a git bash terminal and navigate to folder of your choice.
- Clone this repo using:
```bash
git clone https://github.com/Yumikitsu/3D-Demo.git
```
- Navigate to the correct folder using:
```bash
cd 3D-Demo/3D-Demo/
```
- Inside this folder, install the required packages using:
```bash
npm install
```
- Once the packages are installed, run the project using:
```bash
npm run dev
```
- Then go to the generated localhost link (typically `http://localhost:5173/`) using `Google Chrome`.

## How to use
Once the project is up and running you can navigate the 3D scene using the mouse and keybinds.

There are 3 different scenes you can pick from:
- `RoomScene`: This is the room scene where you can select objects and move or extend/shrink them.
- `HDRIScene`: This is the same as the `RoomScene`, but with HDRI applied (Very laggy, but good for still images).
- `BasicScene`: This is a basic scene with a few geometric shapes and lights, but you `CANNOT` interact with objects in this scene.

To select a different scene, simply open this file:
```bash
3D-Demo/3D-Demo/src/main.ts
```

- To render the `RoomScene`, `main.ts` should look like this:
```TypeScript
  RoomScene.instance.render();

  //HDRIScene.instance.render();

  //BasicScene.instance.render();
```

- To render the `HDRIScene`, `main.ts` should look like this:
```TypeScript
  //RoomScene.instance.render();

  HDRIScene.instance.render();

  //BasicScene.instance.render();
```

- To render the `BasicScene`, `main.ts` should look like this:
```TypeScript
  //RoomScene.instance.render();

  //HDRIScene.instance.render();

  BasicScene.instance.render();
```

### Mouse and Keybinds
- `Left Click`: Left clicking anywhere on the screen locks the mouse to the screen, allowing you to rotate the camera. Left clicking again once in this mode will allow you to select the first object in the middle of your screen. 
- `ESC`: Frees your mouse if it's been locked by `Left Click`.
- `W`:  Moves the camera in the direction you're looking at.
- `A`: Moves the camera to the left of the direction you're looking at.
- `S`: Moves the camera to the right of the direction you're looking at.
- `D`: Moves the camera in the opposite direction you're looking at.
- `E`: Changes the object manipulation mode to `Extend`.
- `M`: Changes the object manipulation mode to `Move`.
- `ArrowUp`: In `Extend`-mode this causes the selected object to extend along X-axis. | In `Move`-mode this casuse the selected object to move -1 units along X-axis.
- `ArrowDown`: In `Extend`-mode this causes the selected object to shrink along X-axis. | In `Move`-mode this casuse the selected object to move +1 units along X-axis.
- `ArrowRight`: In `Extend`-mode this causes the selected object to extend along Z-axis. | In `Move`-mode this casuse the selected object to move -1 units along Z-axis.
- `ArrowLeft`: In `Extend`-mode this causes the selected object to shrink along Z-axis. | In `Move`-mode this casuse the selected object to move +1 units along Z-axis.
- `Spacebar`: In `Extend`-mode this causes the selected object to extend along Y-axis. | In `Move`-mode this casuse the selected object to move +1 units along Y-axis.
- `Shift`: In `Extend`-mode this causes the selected object to shrink along Y-axis. | In `Move`-mode this casuse the selected object to move -1 units along Y-axis.