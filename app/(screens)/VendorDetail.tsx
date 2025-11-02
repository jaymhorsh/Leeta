import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVendorDetails } from '@/hooks/products';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

export default function VendorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading, isError } = useVendorDetails(Number(id));

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <MaterialIcons name="arrow-back" size={24} color="#213517" />
          </TouchableOpacity>
          <Text className="text-xl font-matterBold text-brand-text">Product Details</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600 font-matter">Loading details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <MaterialIcons name="arrow-back" size={24} color="#213517" />
          </TouchableOpacity>
          <Text className="text-xl font-matterBold text-brand-text">Product Details</Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-600 font-matter">Error loading product details</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <MaterialIcons name="arrow-back" size={24} color="#213517" />
        </TouchableOpacity>
        <Text className="text-xl font-matterBold text-brand-text">Product Details</Text>
      </View>

      <ScrollView className="flex-1">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Product Image */}
          <View className="w-full h-80 bg-gray-100">
            <Image source={{ uri: product.thumbnail }} className="w-full h-full" resizeMode="contain" />
            {product.discountPercentage > 0 && (
              <View className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full">
                <Text className="text-white font-matterBold text-sm">-{product.discountPercentage.toFixed(0)}% OFF</Text>
              </View>
            )}
          </View>

          <View className="px-6 py-6">
            {/* Title and Brand */}
            <View className="mb-4">
              <Text className="text-sm text-brand-primary font-matterSemiBold mb-1">{product.brand}</Text>
              <Text className="text-2xl font-matterBold text-brand-text mb-2">{product.title}</Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center mr-4">
                  <MaterialIcons name="star" size={18} color="#FFD43B" />
                  <Text className="text-base font-matterSemiBold text-brand-text ml-1">{product.rating.toFixed(1)}</Text>
                  <Text className="text-sm text-gray-600 font-matter ml-1">({product.reviews.length} reviews)</Text>
                </View>
              </View>
            </View>

            {/* Price */}
            <View className="bg-surface-gray rounded-2xl p-4 mb-6 flex-row items-center justify-between">
              <View>
                <Text className="text-sm text-gray-600 font-matter mb-1">Price</Text>
                <Text className="text-3xl font-matterBold text-brand-primary">${product.price.toFixed(2)}</Text>
              </View>
              <View className="items-end">
                <Text className="text-sm text-gray-600 font-matter mb-1">In Stock</Text>
                <Text className="text-lg font-matterSemiBold text-green-600">{product.stock} units</Text>
              </View>
            </View>

            {/* Description */}
            <View className="mb-6">
              <Text className="text-lg font-matterBold text-brand-text mb-3">Description</Text>
              <Text className="text-base text-gray-700 font-matter leading-6">{product.description}</Text>
            </View>

            {/* Product Info */}
            <View className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <Text className="text-lg font-matterBold text-brand-text mb-3">Product Information</Text>
              <View className="space-y-2">
                <View className="flex-row justify-between py-2 border-b border-gray-100">
                  <Text className="text-sm text-gray-600 font-matter">Category</Text>
                  <Text className="text-sm font-matterSemiBold text-brand-text">{product.category}</Text>
                </View>
                <View className="flex-row justify-between py-2 border-b border-gray-100">
                  <Text className="text-sm text-gray-600 font-matter">SKU</Text>
                  <Text className="text-sm font-matterSemiBold text-brand-text">{product.sku}</Text>
                </View>
                <View className="flex-row justify-between py-2 border-b border-gray-100">
                  <Text className="text-sm text-gray-600 font-matter">Weight</Text>
                  <Text className="text-sm font-matterSemiBold text-brand-text">{product.weight} kg</Text>
                </View>
                <View className="flex-row justify-between py-2">
                  <Text className="text-sm text-gray-600 font-matter">Warranty</Text>
                  <Text className="text-sm font-matterSemiBold text-brand-text">{product.warrantyInformation}</Text>
                </View>
              </View>
            </View>

            {/* Tags */}
            {product.tags.length > 0 && (
              <View className="mb-6">
                <Text className="text-lg font-matterBold text-brand-text mb-3">Tags</Text>
                <View className="flex-row flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <View key={index} className="bg-brand-primary/10 px-3 py-1.5 rounded-full">
                      <Text className="text-sm font-matterSemiBold text-brand-primary">{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Reviews */}
            <View className="mb-6">
              <Text className="text-lg font-matterBold text-brand-text mb-3">Customer Reviews ({product.reviews.length})</Text>

              {product.reviews.map((review, index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  }}
                  className="bg-white rounded-2xl p-4 mb-3 border border-gray-200"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                      <Text className="text-base font-matterBold text-brand-text">{review.reviewerName}</Text>
                      <Text className="text-xs text-gray-500 font-matter">{review.reviewerEmail}</Text>
                    </View>
                    <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <MaterialIcons name="star" size={14} color="#FFD43B" />
                      <Text className="text-sm font-matterSemiBold text-yellow-700 ml-1">{review.rating}</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-gray-700 font-matter leading-5 mb-2">{review.comment}</Text>
                  <Text className="text-xs text-gray-500 font-matter">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </Animated.View>
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="px-6 py-4 border-t border-gray-100 bg-white">
        <TouchableOpacity className="bg-brand-primary py-4 rounded-full active:opacity-80">
          <Text className="text-white text-center font-matterSemiBold text-base">Add to Cart - ${product.price.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
