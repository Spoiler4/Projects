import { Platform, StyleSheet, View } from 'react-native';
import React, { createContext, useContext, useCallback, useEffect, useState, ReactNode, useMemo } from 'react';

/** iPhone 16 logical screen size (points) */
const IPHONE_16_WIDTH = 390;
const IPHONE_16_HEIGHT = 844;

type FrameContextValue = {
	frameWidth: number | null;
	frameHeight: number | null;
	isFramed: boolean;
};

const DeviceFrameContext = createContext<FrameContextValue>({
	frameWidth: null,
	frameHeight: null,
	isFramed: false,
});

export function useDeviceFrame() {
	return useContext(DeviceFrameContext);
}

type DeviceFrameProps = {
	children: ReactNode;
};

/**
 * Renders children inside an iPhone 16 device frame when running on web (PC).
 * On native (iOS/Android) children are rendered directly so the phone UI is untouched.
 */
export default function DeviceFrame({ children }: DeviceFrameProps) {
	const isWeb = Platform.OS === 'web';
	const isFramed = isWeb;

	const [scale, setScale] = useState(1);

	const recomputeScale = useCallback(() => {
		if (typeof window === 'undefined') return;
		const padding = 24;
		const scaleW = Math.max(0.3, (window.innerWidth - padding * 2) / IPHONE_16_WIDTH);
		const scaleH = Math.max(0.3, (window.innerHeight - padding * 2) / IPHONE_16_HEIGHT);
		setScale(Math.min(1, scaleW, scaleH));
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		recomputeScale();
		window.addEventListener('resize', recomputeScale);
		return () => window.removeEventListener('resize', recomputeScale);
	}, [recomputeScale]);

	const ctx: FrameContextValue = useMemo(
		() => ({
			frameWidth: isFramed ? IPHONE_16_WIDTH : null,
			frameHeight: isFramed ? IPHONE_16_HEIGHT : null,
			isFramed,
		}),
		[isFramed]
	);

	if (!isFramed) {
		return (
			<DeviceFrameContext.Provider value={ctx}>{children}</DeviceFrameContext.Provider>
		);
	}

	return (
		<DeviceFrameContext.Provider value={ctx}>
			<View
				style={[
					styles.frameWrapper,
					{ transform: [{ scale }], transformOrigin: 'top left' },
				]}
			>
				{/* The computed CSS scale is applied via an inline style object below */}
				<View
					style={[
						styles.frame,
						{
							transform: [{ scale: 1 }],
						},
					]}
				>
					{/* Dynamic Island / notch */}
					<View style={styles.dynamicIsland} />
					{/* Earpiece / sensors */}
					<View style={styles.earpiece} />
					{/* Side buttons */}
					<View style={styles.sideLeft} />
					<View style={styles.sideRight} />
					{/* Bottom port & speaker */}
					<View style={styles.bottomPort} />
					<View style={styles.bottomSpeaker} />
					{/* Screen area - fixed iPhone 16 size */}
					<View style={styles.screen}>{children}</View>
				</View>
			</View>
		</DeviceFrameContext.Provider>
	);
}

const styles = StyleSheet.create({
	frameWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#8E8E93',
	},
	frame: {
		width: IPHONE_16_WIDTH,
		height: IPHONE_16_HEIGHT,
		backgroundColor: '#1C1C1E',
		borderRadius: 51,
		borderWidth: 13,
		borderColor: '#1C1C1E',
		overflow: 'hidden',
		position: 'relative',
		marginHorizontal: 12,
		marginVertical: 12,
	},
	dynamicIsland: {
		position: 'absolute',
		top: 20,
		alignSelf: 'center',
		width: 134,
		height: 36,
		backgroundColor: '#1C1C1E',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#3A3A3C',
		zIndex: 100,
	},
	earpiece: {
		position: 'absolute',
		top: 10,
		alignSelf: 'center',
		width: 68,
		height: 6,
		backgroundColor: '#1C1C1E',
		borderRadius: 3,
		zIndex: 100,
	},
	sideLeft: {
		position: 'absolute',
		top: IPHONE_16_HEIGHT * 0.3,
		left: -9,
		width: 9,
		height: 120,
		backgroundColor: '#1C1C1E',
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
		borderWidth: 13,
		borderColor: '#1C1C1E',
		borderRightWidth: 0,
		zIndex: 50,
	},
	sideRight: {
		position: 'absolute',
		top: IPHONE_16_HEIGHT * 0.62,
		right: -9,
		width: 9,
		height: 100,
		backgroundColor: '#1C1C1E',
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
		borderWidth: 13,
		borderColor: '#1C1C1E',
		borderLeftWidth: 0,
		zIndex: 50,
	},
	bottomPort: {
		position: 'absolute',
		bottom: 22,
		left: IPHONE_16_WIDTH * 0.28,
		width: 5,
		height: 10,
		backgroundColor: '#1C1C1E',
		borderRadius: 2,
		zIndex: 60,
	},
	bottomSpeaker: {
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
		width: IPHONE_16_WIDTH * 0.55,
		height: 6,
		backgroundColor: '#1C1C1E',
		borderRadius: 3,
		zIndex: 60,
	},
	screen: {
		width: IPHONE_16_WIDTH,
		height: IPHONE_16_HEIGHT,
		backgroundColor: '#000000',
		borderRadius: 38,
		overflow: 'hidden',
	},
});
