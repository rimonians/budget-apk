import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontFamily: "concertOne",
    fontSize: 24,
    textTransform: "capitalize",
  },
  subHeading: {
    fontFamily: "concertOne",
    fontSize: 18,
    textTransform: "capitalize",
  },
  text: {
    fontFamily: "concertOne",
    color: "gray",
    textAlign: "justify",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "purple",
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: "#fff",
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "concertOne",
  },
});

export default globalStyle;
