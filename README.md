# 3D Demo - TypeScript + Three.js

## Overview
This project demonstrates a 3D interactive scene built using `TypeScript` and `Three.js`. You can interact with different 3D scenes and manipulate objects using the mouse and keyboard.

## Setting up the Project
### 1. Clone the Repository
Open a git bash terminal and navigate to your desired folder, then run:
```bash
git clone https://github.com/Yumikitsu/3D-Demo.git
```
### 2. Navigate to the Correct Folder
```bash
cd 3D-Demo/3D-Demo/
```
### 3. Install Dependencies
Install the required packages:
```bash
npm install
```
### 4. Run the Project
Start the development server:
```bash
npm run dev
```
Visit [localhost](http://localhost:5173/) in `Google Chrome` to see the project running.

## How to Use
Once the project is running, you can interact with the 3D scene using the mouse and keybinds.

### Available Scenes
There are 3 scenes you can select from:
1. `RoomScene`: A room where you can interact with objects by moving or resizing them.
2. `HDRIScene`: Similar to `RoomScene`, but with HDRI applied (note: this may be laggy, only suitable for still images).
3. `BasicScene`: A simple scene with geometric shapes and lights, but no interaction with objects.

### Switching Scenes
To switch scenes, open the file `3D-Demo/3D-Demo/src/main.ts` and modifiy it to render the desired scene:

- For `RoomScene`:
```TypeScript
  import './style.css'
  import RoomScene from './scene/RoomScene';
  import BasicScene from './scene/BasicScene';
  import HDRIScene from './scene/HDRIScene';

  RoomScene.instance.render();

  //HDRIScene.instance.render();

  //BasicScene.instance.render();
```
- For `HDRIScene`:
```TypeScript
  import './style.css'
  import RoomScene from './scene/RoomScene';
  import BasicScene from './scene/BasicScene';
  import HDRIScene from './scene/HDRIScene';

  //RoomScene.instance.render();

  HDRIScene.instance.render();

  //BasicScene.instance.render();
```
- For `BasicScene`:
```TypeScript
  import './style.css'
  import RoomScene from './scene/RoomScene';
  import BasicScene from './scene/BasicScene';
  import HDRIScene from './scene/HDRIScene';

  //RoomScene.instance.render();

  //HDRIScene.instance.render();

  BasicScene.instance.render();
```

## Mouse and Keyboard Controls
### Mouse Controls
- `Left Click`:
  Locks the mouse to the screen, allowing you to rotate the camera.
  - Left-clicking while the mouse is locked will select the first object in the center of your screen.
- `ESC`:
  Frees your mouse if it's been locked by left-clicking.

### Camera Movement Controls
- `W`:
  Moves the camera in the direction you're currently looking.
- `A`:
  Moves the camera to the left of your current view.
- `S`:
  Moves the camera to the right of your current view.
- `D`:
  Moves the camera in the opposite direction you're looking.

### Object Manipulation Modes
- `E`:
  Switches to `Extend Mode`, allowing you to resize selected objects along their axes.
- `M`:
  Switches to `Move Mode`, allowing you to move selected objects along their axes.

### Object Manipulation Controls
In `Extend Mode`:
- `ArrowUp`:
  Extends the selected object along the X-axis.
- `ArrowDown`:
  Shrinks the selected object along the X-axis.
- `ArrowRight`:
  Extends the selected object along the Z-axis.
- `ArrowLeft`:
  Shrinks the selected object along the Z-axis.
- `Spacebar`:
  Extends the selected object along the Y-axis.
- `Shift`:
  Shrinks the selected object along the Y-axis.

In `Move Mode`:
- `ArrowUp`:
  Moves the selected object -1 unit along the X-axis.
- `ArrowDown`:
  Moves the selected object +1 unit along the X-axis.
- `ArrowRight`:
  Moves the selected object -1 unit along the Z-axis.
- `ArrowLeft`:
  Moves the selected object +1 unit along the Z-axis.
- `Spacebar`:
  Moves the selected object +1 unit along the Y-axis.
- `Shift`:
  Moves the selected object -1 unit along the Y-axis.
