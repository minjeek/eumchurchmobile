import { StyleSheet, Dimensions } from 'react-native';

export const HORIZONTAL_EDGE_PADDING = 20;
export const HEADER_TOP_HEIGHT = 52;
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');


export const CommonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: HORIZONTAL_EDGE_PADDING,
  },
  scrollContent: {
    paddingBottom: 48,
  },
});