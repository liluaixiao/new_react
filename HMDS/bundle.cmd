@echo start bundle on window....
react-native bundle --entry-file ./index.android.js --bundle-output ./bundle/android/index.android.bundle --platform android --assets-dest ./bundle/android/ --dev false && react-native bundle --entry-file ./index.ios.js --bundle-output ./bundle/ios/index.ios.bundle --platform ios --assets-dest ./bundle/ios/ --dev false
@echo end bundle....