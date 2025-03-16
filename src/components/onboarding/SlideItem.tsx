import { Text, useWindowDimensions, View } from "react-native";
import { CustomText } from "../custom";
import { useThemeStore } from "../../hooks";
import type { SlideItemProps } from "../../types";
import { useMemo } from "react";

export const SlideItem: React.FC<SlideItemProps> = ({ desc, img, title, style }) => {
    const { colors } = useThemeStore();
    const { width, height, fontScale } = useWindowDimensions();
    const gradientColors = useMemo<string[]>(() => [
        colors.blue[600],
        colors.purple[600],
        colors.rose[600],
    ], [colors]);

    return (
        <View style={[{
            width,
            flex: 1,
            height: height * 0.4,
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginVertical: height * 0.1,
        }, style]}>
            <View style={{
                height: height * 0.3,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {img}
            </View>
            <CustomText
                text={title}
                fontSize={fontScale * 30}
                gradientColors={gradientColors}
                fontWeight='black'
            />
            <Text style={{
                fontSize: fontScale * 15,
                fontWeight: '500',
                textAlign: 'left',
                paddingHorizontal: 60,
                paddingTop: 5,
                fontFamily: 'Nunito-Regular',
                color: colors.coolGray[900],
            }}>{desc}</Text>
        </View>
    );
};
