import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import OdooService from '../services/OdooService';

const InventoryScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadInventory = async () => {
    try {
      const odoo = new OdooService(
        process.env.ODOO_BASE_URL,
        process.env.ODOO_DB,
        process.env.ODOO_USERNAME,
        process.env.ODOO_PASSWORD
      );
      
      const result = await odoo.execute_kw(
        'stock.quant',
        'search_read',
        [[]],
        { fields: ['product_id', 'quantity', 'location_id'] }
      );

      setInventory(result);
    } catch (error) {
      console.error('Inventory load error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={inventory}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadInventory();
              }}
            />
          }
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>Product: {item.product_id[1]}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Location: {item.location_id[1]}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default InventoryScreen;