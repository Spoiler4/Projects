import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Dimensions,
    Alert,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '@/theme/theme';
import EmptyListAnimation from '@/components/EmptyListAnimation';
import PaymentFooter from '@/components/PaymentFooter';
import CartItem from '@/components/CartItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { AppRootState, useAppDispatch, useAppSelector } from '@/store/store';
import { clearCart } from '@/store/features/cartSlice';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomerCart = () => {
    // Safely retrieve tab bar height with a fallback to avoid navigation context crashes
    let tabBarHeight = 85;
    try {
        tabBarHeight = useBottomTabBarHeight();
    } catch (e) {
        // Fallback height if hook context is temporarily unavailable
        tabBarHeight = 85;
    }

    const dispatch = useAppDispatch();
    const CartList = useAppSelector((state: AppRootState) => state.cart.cartList);
    const CartPrice = useAppSelector((state: AppRootState) => state.cart.totalPrice);

    const buttonPressHandler = () => {
        const total = Number(CartPrice || 0).toFixed(2);
        Alert.alert(
            'Order Placed',
            `Your order total was $${total}. Thank you for shopping with us!`,
            [
                {
                    text: 'Continue',
                    onPress: () => dispatch(clearCart()),
                },
            ]
        );
    };

    // Moti animation step trigger
    const [step, setStep] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep(1);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.ScreenContainer} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} barStyle="light-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        {CartList.length === 0 ? (
                            <EmptyListAnimation title={'Cart is Empty'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {CartList.map((data, index) => (
                                    <MotiView
                                        key={data._id ? String(data._id) : index}
                                        from={{
                                            opacity: 0,
                                            transform: [{ translateY: 15 }],
                                        }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 30,
                                            delay: index * 200,
                                        }}>
                                        <CartItem
                                            _id={String(data._id)}
                                            name={data.name}
                                            prices={data.prices}
                                            brand={data.brand}
                                            image={data.images?.[0]}
                                            selectedSize={data.selectedSize}
                                        />
                                    </MotiView>
                                ))}
                            </View>
                        )}
                    </View>

                    {CartList.length !== 0 && (
                        <View style={{ paddingVertical: 19 }}>
                            <PaymentFooter
                                buttonPressHandler={buttonPressHandler}
                                buttonTitle="Order Now"
                                price={String(CartPrice)}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
        minHeight: SCREEN_HEIGHT * 0.9,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: 20,
        gap: 20,
        paddingTop: 10,
    },
});

export default CustomerCart;
