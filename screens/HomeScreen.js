import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon, CalendarDaysIcon } from "react-native-heroicons/solid";

import React from "react";

const HomeScreen = () => {
  const [showSearch, toogleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc) => {
    console.log(`Location: ${loc}`);
  };
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute w-full h-full"
        blurRadius={70}
        source={require("../assets/images/bg.png")}
      />
      <SafeAreaView className="flex flex-1">
        {/* Search section */}
        <View style={{ height: "7%" }} className="m-4 relative z-10">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                placeholder="Search city"
                placeholderTextColor={"lightgray"}
                className="pl-6 pb-1 h-10 flex-1 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => toogleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1 " +
                      borderClass
                    }
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text className="text-black text-lg ml-2">
                      London, United Kingdom
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* Forecast section */}
        <View className="mx-4 flex justify-around flex-1 mb-4">
          {/* Location */}
          <Text className="text-white text-center text-2xl font-bold">
            Paris,
            <Text className="text-lg font-semibold text-gray-300"> France</Text>
          </Text>

          {/* Weather Image */}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>
          {/* Degrees celsius*/}
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              23&#176;
            </Text>
            <Text className="text-center text-white text-xl ml-5 tracking-widest">
              Partly cloudy
            </Text>
          </View>
          {/* Other stats */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/mist.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">23%</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                6:03 AM
              </Text>
            </View>
          </View>
        </View>
        {/* Forecast for next days */}
        <View className="mb-4 space-y-2">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size="22" color="white" />
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.14) }}
            >
              <Image
                source={require("../assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">20&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.14) }}
            >
              <Image
                source={require("../assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Tuesday</Text>
              <Text className="text-white text-xl font-semibold">17&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.14) }}
            >
              <Image
                source={require("../assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Wednesday</Text>
              <Text className="text-white text-xl font-semibold">13&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.14) }}
            >
              <Image
                source={require("../assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Thursday</Text>
              <Text className="text-white text-xl font-semibold">16&#176;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.14) }}
            >
              <Image
                source={require("../assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Friday</Text>
              <Text className="text-white text-xl font-semibold">15&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
