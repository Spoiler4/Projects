import { useWindowDimensions, Platform } from 'react-native';
import { useContext } from 'react';
import { DeviceFrameContext } from '@/components/DeviceFrame';

/**
 * Returns the effective screen width/height for the current platform.
 * On web (PC) the app is rendered inside an iPhone 16 frame, so we return the
 * fixed iPhone 16 size (390 x 844) instead of the browser window size. This
 * keeps layouts (cards, stat rows, etc.) consistent between phone and PC.
 * On native (iOS/Android) the real window dimensions are returned.
 */
export function useDeviceDimensions() {
	const ctx = useContext(DeviceFrameContext);
	if (Platform.OS === 'web' && ctx.isFramed && ctx.frameWidth && ctx.frameHeight) {
		return { width: ctx.frameWidth, height: ctx.frameHeight };
	}
	return useWindowDimensions();
}

export function useDeviceWidth() {
	return useDeviceDimensions().width;
}

export function useDeviceHeight() {
	return useDeviceDimensions().height;
}
