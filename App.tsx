/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { store } from "@features/toolkit/store/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Navigation from "@navigation/Navigation";
import { toastConfig } from "@utils/ToastConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Navigation />
        </BottomSheetModalProvider>
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
