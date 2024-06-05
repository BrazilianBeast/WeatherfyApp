import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { debounce } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon, CalendarDaysIcon } from "react-native-heroicons/solid";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants/index";
import * as Progress from "react-native-progress";
import { storeData, getData } from "../utils/asyncStorage";

import React from "react";

const HomeScreen = () => {
  const [showSearch, toogleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {
    setLocations([]);
    toogleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);
      // console.log("got forecast:", data);
    });
  };

  const handleSearch = (value) => {
    // fetchLocations
    fetchLocations({ cityName: value }).then((data) => {
      setLocations(data);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Sao Bernardo do Campo";
    if (myCity) cityName = myCity;
    fetchWeatherForecast({
      cityName,
      days: 7,
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        className="absolute w-full h-full"
        blurRadius={70}
        source={require("../assets/images/bg.png")}
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === "android" ? 20 : 0}
        >
          <SafeAreaView className="flex flex-1">
            {/* Search section */}
            <View style={{ height: "7%" }} className="m-4 relative z-10">
              <View
                className="flex-row justify-end items-center rounded-full"
                style={{
                  backgroundColor: showSearch
                    ? theme.bgWhite(0.2)
                    : "transparent",
                }}
              >
                {showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
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
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
            {/* Forecast section */}
            <View className="mx-4 mt-4 flex justify-around flex-1 mb-4">
              {/* Location */}
              <Text className="text-white mt-8 text-center text-2xl font-bold">
                {location?.name},
                <Text className="text-lg font-semibold text-gray-300">
                  {" " + location?.country}
                </Text>
              </Text>

              {/* Weather Image */}
              <View className="mt-6 flex-row justify-center">
                <Image
                  // source={{ uri: "https:" + current?.condition?.icon }}
                  source={weatherImages[current?.condition?.text]}
                  className="w-52 h-52"
                />
                {/* {console.log(current?.condition?.text, "<<<")} */}
              </View>
              {/* Degrees celsius*/}
              <View className="mt-4 space-y-2">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                  {current?.temp_c}&#176;
                </Text>
                <Text className="text-center text-white text-xl ml-5 tracking-widest">
                  {current?.condition?.text}
                </Text>
              </View>
              {/* Other stats */}
              <View className="mt-16 flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/images/mist.png")}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/drop.png")}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require("../assets/icons/sun.png")}
                    className="h-6 w-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>
            {/* Forecast for next days */}
            <View className="mt-8 space-y-2">
              <View className="flex-row items-center mx-5 space-x-2 mb-2">
                <CalendarDaysIcon size="22" color="white" />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date);
                  let options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(".")[0];
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                      style={{ backgroundColor: theme.bgWhite(0.14) }}
                    >
                      <Image
                        source={weatherImages[item?.day?.condition?.text]}
                        className="h-10 w-10"
                      />
                      {/* {console.log(item?.day?.condition?.text)} */}
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
