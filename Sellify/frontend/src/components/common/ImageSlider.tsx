import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	Animated,
	StyleSheet,
	View,
	ImageBackground,
	Text,
	TouchableOpacity,
	Platform,
} from 'react-native';

import { useDeviceWidth } from '@/theme/useDeviceDimensions';
import { COLORS } from '@/theme/theme';

const DEFAULT_IMAGES = [
	'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
	'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
];

interface ImageSliderProp {
	imageList?: string[];
	imageHeight?: number;
}

const ImageSlider: React.FC<ImageSliderProp> = ({
	imageList = DEFAULT_IMAGES,
	imageHeight = 290,
}) => {
	const slideWidth = useDeviceWidth();
	const itemCount = imageList.length;
	if (itemCount === 0) return null;

	const translateX = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);
	const currentTranslate = useRef(0);
	const dragStartX = useRef(0);
	const dragStartTranslate = useRef(0);

	useEffect(() => {
		const sub = translateX.addListener(({ value }) => {
			currentTranslate.current = value;
		});
		return () => sub.remove();
	}, [translateX]);

	const snapTo = useCallback(
		(index: number) => {
			const next = Math.max(0, Math.min(index, itemCount - 1));
			setCurrentIndex(next);
			Animated.spring(translateX, {
				toValue: -next * slideWidth,
				damping: 16,
				stiffness: 140,
				useNativeDriver: false,
			}).start();
		},
		[translateX, slideWidth, itemCount]
	);

	const goTo = useCallback(
		(offset: number) => {
			snapTo(currentIndex + offset);
		},
		[currentIndex, snapTo]
	);

	// Autoplay
	useEffect(() => {
		if (itemCount <= 1) return;
		const timer = setInterval(() => {
			const next = currentIndex + 1 >= itemCount ? 0 : currentIndex + 1;
			snapTo(next);
		}, 5000);
		return () => clearInterval(timer);
	}, [currentIndex, itemCount, snapTo]);

	const onTouchStart = useCallback((e: any) => {
		dragStartX.current = e.nativeEvent.locationX ?? e.nativeEvent.pageX ?? 0;
		dragStartTranslate.current = currentTranslate.current;
	}, []);

	const onTouchMove = useCallback(
		(e: any) => {
			const x = e.nativeEvent.locationX ?? e.nativeEvent.pageX ?? 0;
			const delta = x - dragStartX.current;
			let next = dragStartTranslate.current + delta;
			const minTranslate = -(itemCount - 1) * slideWidth;
			next = Math.max(minTranslate, Math.min(0, next));
			translateX.setValue(next);
		},
		[translateX, slideWidth, itemCount]
	);

	const onTouchEnd = useCallback(() => {
		const target = Math.round(Math.abs(currentTranslate.current) / slideWidth);
		snapTo(target);
	}, [currentTranslate, slideWidth, snapTo]);

	return (
		<View style={[styles.container, { width: slideWidth }]}>
			<View
				style={[
					styles.trackWrapper,
					{ width: slideWidth, height: imageHeight },
				]}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<Animated.View
					style={[
						styles.track,
						{ transform: [{ translateX }] },
					]}
				>
					{imageList.map((src, i) => (
						<View key={i} style={[styles.slide, { width: slideWidth, height: imageHeight }]}>
							<ImageBackground
								source={{ uri: src }}
								style={styles.image}
								resizeMode="cover"
							/>
						</View>
					))}
				</Animated.View>

				{Platform.OS === 'web' && itemCount > 1 && (
					<>
						<TouchableOpacity
							style={[styles.navButton, styles.navLeft]}
							onPress={() => goTo(-1)}
							disabled={currentIndex === 0}
						>
							<Text style={styles.navText}>&#10094;</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.navButton, styles.navRight]}
							onPress={() => goTo(1)}
							disabled={currentIndex === itemCount - 1}
						>
							<Text style={styles.navText}>&#10095;</Text>
						</TouchableOpacity>
					</>
				)}
			</View>

			<View style={styles.dotsContainer}>
				{imageList.map((_, i) => (
					<View
						key={i}
						style={[
							styles.dot,
							{
								width: currentIndex === i ? 16 : 8,
								backgroundColor:
									currentIndex === i
										? COLORS.primaryOrangeHex
										: '#C9C9CE',
							},
						]}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginBottom: -7,
		alignSelf: 'center',
	},
	trackWrapper: {
		overflow: 'hidden',
		borderRadius: 10,
		position: 'relative',
	},
	track: {
		flexDirection: 'row',
	},
	slide: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		borderRadius: 10,
		width: '100%',
		height: '100%',
	},
	navButton: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		width: 44,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	navLeft: {
		left: 0,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
	navRight: {
		right: 0,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	navText: {
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: '700',
	},
	dotsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 8,
	},
	dot: {
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
		backgroundColor: '#C9C9CE',
	},
});
