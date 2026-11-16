
import {
  useUser,
} from "@clerk/expo";

import {
  useRouter,
  useFocusEffect,
} from "expo-router";

import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCallback, useState } from "react";

import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";

// Custom delete modal
import DeleteTransactionModal from "../../components/DeleteTransactionModal";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  // Delete modal states
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const userId = user?.id;

  const {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  } = useTransactions(userId);

  // Refresh whenever home screen becomes active
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        loadData();
      }
    }, [userId, loadData])
  );

  // Pull to refresh
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await loadData();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Open delete confirmation modal
  const handleDelete = (id) => {
    setSelectedTransactionId(id);
    setDeleteModalVisible(true);
  };

  // Confirm transaction deletion
  const confirmDelete = async () => {
    if (selectedTransactionId == null || deleting) return;

    try {
      setDeleting(true);

      const success = await deleteTransaction(
        selectedTransactionId
      );

      if (success) {
        setDeleteModalVisible(false);
        setSelectedTransactionId(null);

        await loadData();
      } else {
        Alert.alert(
          "Delete Failed",
          "Unable to delete this transaction. Please try again."
        );
      }
    } catch (error) {
      console.error("Delete error:", error);

      Alert.alert(
        "Error",
        "Something went wrong while deleting the transaction."
      );
    } finally {
      setDeleting(false);
    }
  };

  // Close delete modal
  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModalVisible(false);
    setSelectedTransactionId(null);
  };

  // Initial loading
  if (!isLoaded || (userId && isLoading)) {
    return <PageLoader />;
  }

  if (!userId) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        {/* HEADER */}
        <View style={styles.header}>

          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                Welcome,
              </Text>

              <Text style={styles.usernameText}>
                {user?.emailAddresses?.[0]?.emailAddress?.split("@")[0]}
              </Text>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
              activeOpacity={0.8}
            >
              <Ionicons
                name="add"
                size={20}
                color="#FFF"
              />

              <Text style={styles.addButtonText}>
                Add
              </Text>
            </TouchableOpacity>

            <SignOutButton />
          </View>
        </View>

        {/* BALANCE CARD */}
        <BalanceCard summary={summary} />

        {/* TRANSACTIONS HEADER */}
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>
            Recent Transactions
          </Text>
        </View>

      </View>

      {/* TRANSACTIONS LIST */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TransactionItem
            item={item}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      {/* PROFESSIONAL DELETE CONFIRMATION MODAL */}
      <DeleteTransactionModal
        visible={deleteModalVisible}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
        loading={deleting}
      />

    </View>
  );
}
