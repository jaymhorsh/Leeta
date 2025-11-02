import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useVendors } from '@/hooks/products';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '@/types/api';

export default function HomeScreen() {
  const router = useRouter();
  const { data, isLoading, isError, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useVendors();

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  // Product Card Item Component
  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(screens)/VendorDetail?id=${item.id}`)}
      className="w-[48%] bg-white rounded-2xl mb-4 border border-gray-200 active:opacity-70 overflow-hidden"
    >
      <View className="w-full h-32 bg-gray-100">
        <Image source={{ uri: item.thumbnail }} className="w-full h-full" resizeMode="cover" />
      </View>
      <View className="p-3">
        <Text className="text-base font-matterBold text-brand-text mb-1" numberOfLines={2}>
          {item.title}
        </Text>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs text-gray-500 font-matter">{item.brand}</Text>
          <View className="flex-row items-center">
            <MaterialIcons name="star" size={12} color="#FFD43B" />
            <Text className="text-xs text-gray-600 font-matter ml-1">{item.rating.toFixed(1)}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-matterBold text-brand-primary">${item.price.toFixed(2)}</Text>
          {item.discountPercentage > 0 && (
            <View className="bg-red-100 px-2 py-0.5 rounded-full">
              <Text className="text-xs font-matterSemiBold text-red-600">-{item.discountPercentage.toFixed(0)}%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Loading Footer Component
  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#00B388" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00B388" />
          <Text className="mt-4 text-gray-600 font-matter">Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <MaterialIcons name="error-outline" size={64} color="#FF2F2F" />
          <Text className="mt-4 text-xl font-matterBold text-brand-text">Something went wrong</Text>
          <Text className="mt-2 text-gray-600 text-center font-matter">Unable to load products. Please try again.</Text>
          <TouchableOpacity onPress={() => refetch()} className="mt-6 bg-brand-primary px-8 py-3 rounded-full">
            <Text className="text-white font-matterSemiBold">Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-3xl font-matterBold text-brand-text">Gas Products</Text>
        <Text className="text-gray-600 font-matter mt-1">Find the best gas products for delivery</Text>
      </View>

      <FlatList
        data={allProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderProductCard}
        refreshControl={
          <RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={refetch} tintColor="#00B388" colors={['#00B388']} />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}
