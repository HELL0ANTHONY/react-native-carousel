import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { server as DATA } from "./server";

const { width } = Dimensions.get("screen");
const imageW = width * 0.9;
const imageH = imageW * 1.54;

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.corouselBackground}>
        {DATA.map(({ image }, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: image }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item: { image, title, text } }) => {
          return (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <Text>{title}</Text>
              <Text>{text}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  corouselBackground: StyleSheet.absoluteFillObject,
  imageContainer: { width, justifyContent: "center", alignItems: "center" },
  image: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
  },
});
