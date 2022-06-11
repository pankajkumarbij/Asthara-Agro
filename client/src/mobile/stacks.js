import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faBars } from '@fortawesome/free-solid-svg-icons';
import Home from '../components/home/home';
import Login from '../components/user/login';
import AddCategory from '../components/itemCategory/add_item_category';
import Register from '../components/user/register';
import AddAddress from '../components/address/add_address';
import AddBankDetails from '../components/bank/add_bank_details';
import AddItem from '../components/item/addItem';
import AllItems from '../components/item/allitems';
import AddItemCategory from '../components/itemCategory/add_item_category';
import AllItemCategories from '../components/itemCategory/all_item_categories';
import AddItemUnit from '../components/itemUnit/add_item_unit';
import AllItemUnits from '../components/itemUnit/all_item_unit';
import AddItemGrade from '../components/itemGrade/add_item_grade';
import AllItemGrades from '../components/itemGrade/all_item_grade';
import AllOrders from '../components/order/all_orders';
import ApprovedOrders from '../components/order/approved_orders';
import PendingOrders from '../components/order/pending_orders';
import All_Purchase_Orders from '../components/purchase_order/All_Purchase_Orders';
import All_Pending_Purchase_Orders from '../components/purchase_order/All_Pending_Purchase_Orders';
import All_Accepted_Purchase_Orders from '../components/purchase_order/All_Accepted_Purchase_Orders';
import All_Purchase_Order_Confirm from '../components/purchase_confirm/All_Purchase_Order_Confirm';
import All_Pending_Purchase_Order_Confirm from '../components/purchase_confirm/All_Pending_Purchase_Order_Confirm';
import All_Accepted_Purchase_Order_Confirm from '../components/purchase_confirm/All_Accepted_Purchase_Order_Confirm';
import AllUsers from '../components/manager/all_users';
import AddUserCategory from '../components/userCategory/add_user_category';
import AllUserCategories from '../components/userCategory/all_user_categories';
import Disabled_All_Items from '../components/item/disabled_all_items';
import DisabledAllItemCategories from '../components/itemCategory/disabled_all_item_categories';
import DisabledAllItemUnit from '../components/itemUnit/disabled_all_item_unit';
import DisabledAllItemGrade from '../components/itemGrade/disabled_all_item_grade';
import DisabledAllUsers from '../components/manager/disabled_all_users';
import DisabledAllUserCategories from '../components/userCategory/disabled_all_user_categories';
import Disabled_Customer_details from '../components/sales_person/disabled_customer_detail';
import OrderItemsSummary from '../components/order/order_items_summary';
import AllCompletedOrders from '../components/order/all_completed_orders';
import All_Completed_Purchase_Orders from '../components/reports/completed_purchase_order/all_completed_purchase_orders';
import Customer_Account_Delete_Requests from '../components/sales_person/customer_account_delete_requests';
import All_Accepted_Delivery_Assignment from '../components/delivery_assign/All_Accepted_Delivery_Assignment';
import All_Pending_Delivery_Assignment from '../components/delivery_assign/All_Pending_Delivery_Assignment';
import All_Delivery_Assignment from '../components/delivery_assign/All_Delivery_Assignment';
import All_Accepted_Delivery from '../components/update_delivery/All_Confirm_Delivery';
import All_Delivery from '../components/update_delivery/All_Delivery';
import All_Pickup_Assignment from '../components/pickup_assign/All_Pickup_Assignment';
import All_Pending_Pickup_Assignment from '../components/pickup_assign/All_Pending_Pickup_Assignment';
import All_Accepted_Pickup_Assignment from '../components/pickup_assign/All_Accepted_Pickup_Assignment';
import All_Pickup_Assignment_Confirm_Buyer from '../components/pickup_assign_confirm/All_Pickup_Assignment_Confirm_Buyer';
import All_Pickup_Assignment_Confirm from '../components/pickup_assign_confirm/All_Pickup_Assignment_Confirm';
import All_Pending_Pickup_Assignment_Confirm_Vendor from '../components/pickup_assign_confirm/All_Pending_Pickup_Assignment_Confirm_Vendor';
import All_Accepted_Pickup_Assignment_Confirm_Vendor from '../components/pickup_assign_confirm/All_Accepted_Pickup_Assignment_Confirm_Vendor';
import AddCustomerPool from '../components/pool/add_customer_pool';
import AddManagerPool from '../components/pool/add_manager_pool';
import AddVendorPool from '../components/pool/add_vendor_pool';
import AllCustomerPools from '../components/pool/all_customer_pools';
import AllManagerPools from '../components/pool/all_manager_pools';
import AllVendorPools from '../components/pool/all_vendor_pools';
import AddCustomerVendorPool from '../components/pool/vendor_customer_cross';
import AllCustomerVendorPools from '../components/pool/all_cross_pool';
import Customer_details from '../components/sales_person/customer_detail';
import CreateOrder from '../components/order/createorder';
import Add_customer_Address from '../components/customer_address/add_customer_address';
import All_addresses from '../components/customer_address/all_customer_address';
import VendorsAllItems from '../components/vendorsItem/vendors_allitems';
import Add_vendor_Address from '../components/vendor_address/add_vendor_address';
import All_addressesVendor from '../components/vendor_address/all_vendor_address';
import AddTransportLabourFromVendor from '../components/transport_labour/transport_labour_from_vendor/transport_labour_from_vendor';
import AllTransportLabourFromVendor from '../components/transport_labour/transport_labour_from_vendor/all_transport_labour_from_vendor';
import AddTransportLabour from '../components/transport_labour/transport_labour_for_sales/transport_labour';
import AllTransportLabourForSales from '../components/transport_labour/transport_labour_for_sales/all_transport_labour_for_sales';
import Vendor_details from '../components/buyer/vendor_details';
import VendorsAddItem from '../components/vendorsItem/vendors_addItem';
import EditItemapp from '../components/item/edititem_app';
import EditItemGradeapp from '../components/itemGrade/edit_item_grade_app';
import EditItemCategoryapp from '../components/itemCategory/edit_item_category_app';
import EditItemUnitapp from '../components/itemUnit/edit_item_unit_app';
import EditOrderapp from '../components/order/edit_order_app';
import All_Dispatch_Orders_From_Buyer from '../components/reports/all_dispatch_order_items/all_dispatch_order_items';
import All_order_status from '../components/reports/order_status/all_order_status';
import All_Received_Orders_From_Buyer from '../components/reports/received_items_from_buyer/all_received_items_from_buyer'
import BackgroundInfo from '../components/farmer_data_collection/fdc1';
import FarmerTable from '../components/farmer_data_collection/fdc2';
import FarmerLandInfo from '../components/farmer_data_collection/fdc3';
import FarmerEquipmentTable from '../components/farmer_data_collection/fdc4';
import FarmerCheckBox from '../components/farmer_data_collection/fdc5';
import VendorsPendingItems from '../components/vendorsItem/vendors_pending_items';
import VendorsApprovedItems from '../components/vendorsItem/vendors_approved_item';
import Completed_Aim from '../components/excess_inventory_management/completed_aim';
import Pending_Aim from '../components/excess_inventory_management/pending_aim';
import All_Aim from '../components/excess_inventory_management/all_aim';
import Buyer_approved_vendor_item from '../components/vendorsItem/buyer_approved_vendor_item';
import OrderSummary from '../components/reports/order_summary/order_summary';
import AddCustomerManagerPool from '../components/pool/add_manager_customer_pool';
import AllCustomerManagerPools from '../components/pool/all_manager_customer_pool';
import Crawler from '../components/crawler/add_crawler';
import AllCrawlers from '../components/crawler/allcrawler';
import Buyer_assignmnet from '../components/vendorsItem/pending_for_buyer_assignment';
import ExportPdf from '../components/invoice/invoice';
import ViewOrder from '../components/order/view_order';
import ViewUser from '../components/user/view_user';
import AddDispatchForDelivery from '../components/delivery/dispatch_for_delivery';
import AllDispatchForDelivery from '../components/delivery/all_dispatch_for_delivery';
import AllOrderDeliveries from '../components/reports/delivery/all_deliveries';
import AllRejectedItems from '../components/reports/rejectedItems/allRejectedItems';

const Stack = createStackNavigator();

export default function Stacks({navigation}){
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#0cc261",
            },
            headerTintColor: "white",
            headerBackTitle: "Back",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="Home" component={Home} options={{
            headerTitle: () => (
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>Asthara-Agro</Text>
                </View>
            ),
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Register" component={Register} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Login" component={Login} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddCategory" component={AddCategory} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddAddress" component={AddAddress} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddBankDetails" component={AddBankDetails} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddItem" component={AddItem} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllItems" component={AllItems} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddItemCategory" component={AddItemCategory} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllItemCategories" component={AllItemCategories} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddItemUnit" component={AddItemUnit} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllItemUnits" component={AllItemUnits} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddItemGrade" component={AddItemGrade} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllItemGrades" component={AllItemGrades} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllOrders" component={AllOrders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="ApprovedOrders" component={ApprovedOrders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="PendingOrders" component={PendingOrders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Purchase_Orders" component={All_Purchase_Orders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Pending_Purchase_Orders" component={All_Pending_Purchase_Orders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Accepted_Purchase_Orders" component={All_Accepted_Purchase_Orders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Purchase_Order_Confirm" component={All_Purchase_Order_Confirm} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Pending_Purchase_Order_Confirm" component={All_Pending_Purchase_Order_Confirm} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Accepted_Purchase_Order_Confirm" component={All_Accepted_Purchase_Order_Confirm} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllUsers" component={AllUsers} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddUserCategory" component={AddUserCategory} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllUserCategories" component={AllUserCategories} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Disabled_All_Items" component={Disabled_All_Items} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="DisabledAllItemCategories" component={DisabledAllItemCategories} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="DisabledAllItemUnit" component={DisabledAllItemUnit} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="DisabledAllItemGrade" component={DisabledAllItemGrade} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="DisabledAllUsers" component={DisabledAllUsers} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="DisabledAllUserCategories" component={DisabledAllUserCategories} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Disabled_Customer_details" component={Disabled_Customer_details} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="OrderItemsSummary" component={OrderItemsSummary} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllCompletedOrders" component={AllCompletedOrders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Completed_Purchase_Orders" component={All_Completed_Purchase_Orders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Customer_Account_Delete_Requests" component={Customer_Account_Delete_Requests} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Delivery_Assignment" component={All_Delivery_Assignment} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Pending_Delivery_Assignment" component={All_Pending_Delivery_Assignment} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Accepted_Delivery_Assignment" component={All_Accepted_Delivery_Assignment} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Delivery" component={All_Delivery} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Accepted_Delivery" component={All_Accepted_Delivery} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
             <Stack.Screen name="All_Pickup_Assignment" component={All_Pickup_Assignment} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Pending_Pickup_Assignment" component={All_Pending_Pickup_Assignment} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Accepted_Pickup_Assignment" component={All_Accepted_Pickup_Assignment} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Pickup_Assignment_Confirm_Buyer" component={All_Pickup_Assignment_Confirm_Buyer} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Pickup_Assignment_Confirm" component={All_Pickup_Assignment_Confirm} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Pending_Pickup_Assignment_Confirm_Vendor" component={All_Pending_Pickup_Assignment_Confirm_Vendor} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Accepted_Pickup_Assignment_Confirm_Vendor" component={All_Accepted_Pickup_Assignment_Confirm_Vendor} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddCustomerPool" component={AddCustomerPool} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddManagerPool" component={AddManagerPool} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
             <Stack.Screen name="AddVendorPool" component={AddVendorPool} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllCustomerPools" component={AllCustomerPools} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllManagerPools" component={AllManagerPools} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllVendorPools" component={AllVendorPools} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddCustomerVendorPool" component={AddCustomerVendorPool} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllCustomerVendorPools" component={AllCustomerVendorPools} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Customer_details" component={Customer_details} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="CreateOrder" component={CreateOrder} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Add_customer_Address" component={Add_customer_Address} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_addresses" component={All_addresses} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="VendorsAddItem" component={VendorsAddItem} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="VendorsAllItems" component={VendorsAllItems} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Add_vendor_Address" component={Add_vendor_Address} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_addressesVendor" component={All_addressesVendor} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddTransportLabourFromVendor" component={AddTransportLabourFromVendor} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllTransportLabourFromVendor" component={AllTransportLabourFromVendor} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddTransportLabour" component={AddTransportLabour} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllTransportLabourForSales" component={AllTransportLabourForSales} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Vendor_details" component={Vendor_details} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
             <Stack.Screen name="EditItem" component={EditItemapp} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="EditItemCategory" component={EditItemCategoryapp} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="EditItemGrade" component={EditItemGradeapp} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="EditItemOrder" component={EditOrderapp} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="EditItemUnit" component={EditItemUnitapp} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
           <Stack.Screen name="All_Received_Orders_From_Buyer" component={All_Received_Orders_From_Buyer} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="VendorsPendingItems" component={VendorsPendingItems} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="VendorsApprovedItems" component={VendorsApprovedItems} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Aim" component={All_Aim} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Pending_Aim" component={Pending_Aim} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Completed_Aim" component={Completed_Aim} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Buyer_approved_vendor_item" component={Buyer_approved_vendor_item} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Dispatch_Orders_From_Buyer" component={All_Dispatch_Orders_From_Buyer} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="OrderSummary" component={OrderSummary} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_order_status" component={All_order_status} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
           <Stack.Screen name="AddCustomerManagerPool" component={AddCustomerManagerPool} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllCustomerManagerPools" component={AllCustomerManagerPools} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Crawler" component={Crawler} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllCrawlers" component={AllCrawlers} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Buyer_assignmnet" component={Buyer_assignmnet} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="ExportPdf" component={ExportPdf} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="ViewOrder" component={ViewOrder} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
             <Stack.Screen name="BackgroundInfo" component={BackgroundInfo} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="FarmerTable" component={FarmerTable} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="FarmerLandInfo" component={FarmerLandInfo} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
   
            <Stack.Screen name="FarmerEquipmentTable" component={FarmerEquipmentTable} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="FarmerCheckBox" component={FarmerCheckBox} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="ViewUser" component={ViewUser} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
           <Stack.Screen name="AddDispatchForDelivery" component={AddDispatchForDelivery} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllDispatchForDelivery" component={AllDispatchForDelivery} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllOrderDeliveries" component={AllOrderDeliveries} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllRejectedItems" component={AllRejectedItems} options={{
                headerLeft:()=>(
                    <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
        </Stack.Navigator>
    );
}
