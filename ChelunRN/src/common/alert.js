import {Alert} from "react-native";

export default function(title = "", content = "", onPress = ()=>{}, btnText = "确定"){
	Alert.alert(title, content, [{text: btnText, onPress}]);
}