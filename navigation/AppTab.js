import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import HomeScreen from "../screens/HomeScreen";
import LogScreen from "../screens/LogScreen";
import UserScreen from "../screens/UserScreen";
import CameraScreen from "../screens/CameraScreen";

const Tab = createBottomTabNavigator();

export default function AppTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}
