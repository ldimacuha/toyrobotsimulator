# Toy Robot Simulator

# Getting Started

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

```sh
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

```sh
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

## How to Use

### Place robot

Start by inputting X and Y starting position for the robot then select a starting direction where the robot should be facing. You can then tap PLACE button to place the robot. 

### Move robot

After placing the robot, tap the MOVE button to make the robot move to its current direction.

### Turn left or right

Tap LEFT or RIGHT button to change the direction where the robot is facing.

### Report

Tap REPORT button to display an alert modal with the current position of the robot

### Reset

Tap the RESET button to remove the robot from the table.

### Demo video

https://github.com/user-attachments/assets/81cffc1a-1f04-4bd2-9188-62ebcd42980f


## Example commands

Example A
- PLACE 0,0,NORTH
- MOVE
- REPORT
- Output: 0,1,NORTH

Example B
- PLACE 0,0,NORTH
- LEFT
- REPORT
- Output: 0,0,WEST

Example C
- PLACE 1,2,EAST
- MOVE
- MOVE
- LEFT
- MOVE
- REPORT
- Output: 3,3,NORTH
