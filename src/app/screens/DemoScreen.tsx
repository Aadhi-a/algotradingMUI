import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { getStorage } from "@utils/mmkvStrorage";

const DemoScreen: FC = () => {
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const userStr = getStorage("User");
    console.log("Raw Storage:", userStr);

    try {
      if (!userStr) {
        setMenus([]); // no data
        return;
      }

      const parsed = JSON.parse(userStr);

      // Convert ALWAYS to array
      if (Array.isArray(parsed)) {
        setMenus(parsed);
      } else {
        setMenus([parsed]); // wrap object inside array
      }
    } catch (e) {
      console.log("JSON Parse Error:", e);
      setMenus([]);
    }
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>DemoScreen</Text>

      {menus.length === 0 ? (
        <Text>No menu data</Text>
      ) : (
        menus.map((item, idx) => (
          <Text key={idx} style={{ marginTop: 10 }}>
            {JSON.stringify(item)}
          </Text>
        ))
      )}
    </View>
  );
};

export default DemoScreen;
