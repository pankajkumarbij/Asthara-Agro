import React, { useState, useEffect } from 'react';
import { Platform, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faUserPlus, faUser, faSignInAlt, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, FormControl, Form, InputGroup, DropdownButton, Dropdown, } from 'react-bootstrap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../components/home/home';
import AddItem from '../components/item/addItem';
import AllItems from '../components/item/allitems';
import CreateOrder from '../components/order/createorder';
import EditItem from '../components/item/edititem';
import Login from '../components/user/login';
import Register from '../components/user/register';
import Buyer_add_vendor from '../components/buyer/add_vendor';
import Vendor_details from '../components/buyer/vendor_details';
import Add_customer from '../components/sales_person/add_customer';
import Customer_details from '../components/sales_person/customer_detail';
import AddItemCategory from '../components/itemCategory/add_item_category';
import AddUserCategory from '../components/userCategory/add_user_category';
import AddAddress from '../components/address/add_address';
import AddBankDetails from '../components/bank/add_bank_details';
import All_Indents from '../components/indent/All_Indents';
import Create_Indent from '../components/indent/Create_Indent';
import Edit_Indent from '../components/indent/Edit_Indent';
import Create_Purchase_Order from '../components/purchase_order/Create_Purchase_Order';
import All_Purchase_Orders from '../components/purchase_order/All_Purchase_Orders';
import Edit_Purchase_Order from '../components/purchase_order/Edit_Purchase_Order';
import AllItemCategories from '../components/itemCategory/all_item_categories';
import Profile from '../components/profile/profile';
import AllUserCategories from '../components/userCategory/all_user_categories';
import EditItemCategory from '../components/itemCategory/edit_item_category';
import EditUserCategory from '../components/userCategory/edit_user_category';
import AllUsers from '../components/manager/all_users';
import EditUser from '../components/user/edit_user.js';
import ViewUser from '../components/user/view_user.js';
import EditAddress from '../components/address/edit_address';
import EditBankDetails from '../components/bank/edit_bank_details';
import Forgotpassword from '../components/profile/forgotpassword';
import EditOrder from '../components/order/edit_order';
import EditItemUnit from '../components/itemUnit/edit_item_unit';
import AddItemUnit from '../components/itemUnit/add_item_unit';
import AllItemUnit from '../components/itemUnit/all_item_unit';
import EditItemGrade from '../components/itemGrade/edit_item_grade';
import AddItemGrade from '../components/itemGrade/add_item_grade';
import AllItemGrade from '../components/itemGrade/all_item_grade';
import All_Purchase_Order_Confirm from '../components/purchase_confirm/All_Purchase_Order_Confirm';
import Edit_Purchase_Order_Confirm from '../components/purchase_confirm/Edit_Purchase_Order_Confirm';
import Edit_Purchase_Order_Confirm2 from '../components/purchase_confirm/Edit_Purchase_Order_Confirm2';
import Edit_Purchase_Order_Confirm3 from '../components/purchase_confirm/Edit_Purchase_Order_Confirm3';
import View_Purchase_Order_Confirm3 from '../components/purchase_confirm/View_Purchase_Order_Confirm3';

import DisabledAllItems from '../components/item/disabled_all_items';
import DisabledAllItemCategories from '../components/itemCategory/disabled_all_item_categories';
import DisabledAllItemGrade from '../components/itemGrade/disabled_all_item_grade';
import DisabledAllItemUnit from '../components/itemUnit/disabled_all_item_unit';
import DisabledAllUsers from '../components/manager/disabled_all_users';
import DisabledAllUserCategories from '../components/userCategory/disabled_all_user_categories';
import Disabled_Customer_details from '../components/sales_person/disabled_customer_detail';

import DisabledEditItem from '../components/item/disablededititem';
import DisabledEditItemCategory from '../components/itemCategory/disabled_edit_item_category';
import DisabledEditItemGrade from '../components/itemGrade/disabled_edit_item_grade';
import DisabledEditItemUnit from '../components/itemUnit/disabled_edit_item_unit';
import DisabledEditUser from '../components/user/disabled_edit_user.js';
import DisabledEditUserCategory from '../components/userCategory/disabled_edit_user_category.js';

import CustomerAccountDeleteRequests from '../components/sales_person/customer_account_delete_requests';
import All_Pending_Purchase_Orders from '../components/purchase_order/All_Pending_Purchase_Orders';
import All_Accepted_Purchase_Orders from '../components/purchase_order/All_Accepted_Purchase_Orders';
import Edit_Purchase_Order_Price from '../components/purchase_order/Edit_Purchase_Order_Price';
import Accepted_Purchase_Orders from '../components/purchase_order/Accepted_Purchase_Orders';

import AllInventory from '../components/inventory/allinventory';

import All_Pending_Purchase_Order_Confirm from '../components/purchase_confirm/All_Pending_Purchase_Order_Confirm';
import All_Accepted_Purchase_Order_Confirm from '../components/purchase_confirm/All_Accepted_Purchase_Order_Confirm';

import CreateInvoice from '../components/invoice/create_invoice';
import AllInvoice from '../components/invoice/all_invoice';

import VenodrsAddItem from '../components/vendorsItem/vendors_addItem';
import VendorsAllItems from '../components/vendorsItem/vendors_allitems';
import VendorsEditItem from '../components/vendorsItem/vendors_edititem';
import VendorsViewItem from '../components/vendorsItem/vendors_view_item';
import VendorAddAddress from '../components/vendor_address/add_vendor_address';
import VendorAllAddress from '../components/vendor_address/all_vendor_address';
import VendorEditAddress from '../components/vendor_address/edit_vendor_address';

import CustomerAddAddress from '../components/customer_address/add_address';
import CustomerAllAddress from '../components/customer_address/all_customer_address';
import CustomerEditAddress from '../components/customer_address/edit_customer_address';

import Edit_Vendor_Purchase_Order from '../components/purchase_order/Edit_Vendor_Purchase_Order';
import All_Declined_Purchase_Orders from '../components/purchase_order/All_Declined_Purchase_Orders';

import CreateGrn from '../components/grn/create_grn';
import AllGrn from '../components/grn/all_grn';

import OrderItemsSummary from '../components/order/order_items_summary';

import EditOrderItem from '../components/order/edit_order_item';

import All_Pickup_Assignment from '../components/pickup_assign/All_Pickup_Assignment';
import Edit_Pickup_Assignment from '../components/pickup_assign/Edit_Pickup_Assignment';
import Edit_Pickup_Assignment2 from '../components/pickup_assign/Edit_Pickup_Assignment2';
import View_Pickup_Assignment2 from '../components/pickup_assign/View_Pickup_Assignment2';
import All_Pending_Pickup_Assignment from '../components/pickup_assign/All_Pending_Pickup_Assignment';
import All_Accepted_Pickup_Assignment from '../components/pickup_assign/All_Accepted_Pickup_Assignment';

import All_Pickup_Assignment_Confirm from '../components/pickup_assign_confirm/All_Pickup_Assignment_Confirm';
import Edit_Pickup_Assignment_Confirm from '../components/pickup_assign_confirm/Edit_Pickup_Assignment_Confirm';
import View_Pickup_Assignment_Confirm from '../components/pickup_assign_confirm/View_Pickup_Assignment_Confirm';

import All_Pending_Pickup_Assignment_Confirm_Vendor from '../components/pickup_assign_confirm/All_Pending_Pickup_Assignment_Confirm_Vendor';
import All_Accepted_Pickup_Assignment_Confirm_Vendor from '../components/pickup_assign_confirm/All_Accepted_Pickup_Assignment_Confirm_Vendor';
import All_Pickup_Assignment_Confirm_Buyer from '../components/pickup_assign_confirm/All_Pickup_Assignment_Confirm_Buyer';

import Edit_Pickup_Assignment_Confirm_Buyer from '../components/pickup_assign_confirm/Edit_Pickup_Assignment_Confirm_Buyer';
import View_Pickup_Assignment_Confirm_Buyer from '../components/pickup_assign_confirm/View_Pickup_Assignment_Confirm_Buyer';

import AllCompletedOrders from '../components/order/all_completed_orders';
import EditCompletedOrder from '../components/order/edit_completed_order';
import EditCompletedOrder2 from '../components/order/edit_completed_order2';
import All_Delivery_Assignment from '../components/delivery_assign/All_Delivery_Assignment';
import All_Pending_Delivery_Assignment from '../components/delivery_assign/All_Pending_Delivery_Assignment';
import All_Accepted_Delivery_Assignment from '../components/delivery_assign/All_Accepted_Delivery_Assignment';

import Alldispatchitems from '../components/reports/all_dispatch_order_items/all_dispatch_order_items';
import View_dispatch_order_items from '../components/reports/all_dispatch_order_items/view_all_dispatch_order_items';

import AllReceiveditems from '../components/reports/received_items_from_buyer/all_received_items_from_buyer';
import EditReceivedOrder from '../components/reports/received_items_from_buyer/view_received_item_from_buyer';

import Edit_Accepted_Delivery_Assignment from '../components/delivery_assign/Edit_Accepted_Delivery_Assignment';
import Edit_Delivery_Assignment from '../components/delivery_assign/Edit_Delivery_Assignment';
import All_Delivery from '../components/update_delivery/All_Delivery';
import All_Confirm_Delivery from '../components/update_delivery/All_Confirm_Delivery';
import Edit_Accepted_Delivery from '../components/update_delivery/Edit_Accepted_Delivery';
import Edit_Confirm_Delivery from '../components/update_delivery/Edit_Confirm_Delivery';

import AllOrders from '../components/order/all_orders';
import ApprovedOrders from '../components/order/approved_orders';
import PendingOrders from '../components/order/pending_orders';
import ViewOrder from '../components/order/view_order';
import View_Purchase_Order from '../components/purchase_order/View_Purchase_Order';

import AddCustomerPool from '../components/pool/add_customer_pool';
import AllCustomerPools from '../components/pool/all_customer_pools';
import EditCustomerPool from '../components/pool/edit_customer_pool';

import AddVendorPool from '../components/pool/add_vendor_pool';
import AllVendorPools from '../components/pool/all_vendor_pools';
import EditVendorPool from '../components/pool/edit_vendor_pool';

import AddCustomerVendorPool from '../components/pool/vendor_customer_cross';
import AllCustomerVendorPools from '../components/pool/all_cross_pool';
import EditCustomerVendorPool from '../components/pool/edit_cross_pool';

import AddCustomerManagerPool from '../components/pool/add_manager_customer_pool';
import AllCustomerManagerPools from '../components/pool/all_manager_customer_pool';
import EditCustomerManagerPool from '../components/pool/edit_manager_customer_pool';

import AddManagerPool from '../components/pool/add_manager_pool';
import AllManagerPools from '../components/pool/all_manager_pools';
import EditManagerPool from '../components/pool/edit_manager_pool';

import AddTransportLabour from '../components/transport_labour/transport_labour_for_sales/transport_labour';
import AllTransportLabourForSales from '../components/transport_labour/transport_labour_for_sales/all_transport_labour_for_sales';
import ViewTransportLabourForSales from '../components/transport_labour/transport_labour_for_sales/view_transport_labour_for_sales';

import AddTransportLabourFromVendor from '../components/transport_labour/transport_labour_from_vendor/transport_labour_from_vendor';
import AllTransportLabourFromVendor from '../components/transport_labour/transport_labour_from_vendor/all_transport_labour_from_vendor';
import ViewTransportLabourFromVendor from '../components/transport_labour/transport_labour_from_vendor/view_transport_labour_from_vendor';

import All_Completed_Purchase_Orders from '../components/reports/completed_purchase_order/all_completed_purchase_orders';
import View_Completed_Purchase_Order from '../components/reports/completed_purchase_order/view_completed_purchase_order';

import AddDispatchForDelivery from '../components/delivery/dispatch_for_delivery';
import AllDispatchForDelivery from '../components/delivery/all_dispatch_for_delivery';
import ViewDispatchForDelivery from '../components/delivery/view_dispatch_for_delivery_orders';

import OrderSummary from '../components/reports/order_summary/order_summary';
import ViewOrderSummary from '../components/reports/order_summary/view_order_summary';

import All_order_status from '../components/reports/order_status/all_order_status';

import PageNotFound from '../components/pagenotfound/notfound';
import Scanner from '../components/barcode/scanner';
import Barcode from '../components/barcode/barcode';

const NavBar =()  => {

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [roleas, setRoleas] = useState("");
    const [flag, setFlag] = useState(false);
    const [host, setHost] = useState("");
    const [token,setToken] = useState();

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        async function fetchData() {
            await AsyncStorage.getItem('loginemail')
            .then((loginemail) => {
                setEmail(loginemail);
            })
            await AsyncStorage.getItem('token')
            .then((token) => {
                setToken(token);
            })
            if(flag==false) {
                await AsyncStorage.getItem('role')
                .then((role) => {
                    setRole(role);
                    setRoleas(role);
                    setFlag(true);
                })
            }
        }
        fetchData();
        //console.log(authHeader());
    }, [email, role, flag, host,token]);

    function changeRole(r){
        setRoleas(r);
    }

    const Logout = async (value) => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('loginemail');
        await AsyncStorage.removeItem('loginuserid');
        await AsyncStorage.removeItem('nick_name');
        await AsyncStorage.removeItem('role');
        setEmail("");
        console.log("Logout Success");
    }

    return(
        <Router>
                <Navbar collapseOnSelect expand="lg" style={{paddingLeft: '2%', paddingRight: '2%'}}>
                    <Navbar.Brand to="/" as={Link} style={{color:'green'}}>
                        <img  alt="" src="/images/Asthara-Logo.png" width="35" height="35" className="d-inline-block align-top" />{' '}
                        Asthara Agro
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to="/" as={Link}>Home</Nav.Link>
                            <Nav.Link to="/" as={Link}>Services</Nav.Link>
                            <Nav.Link to="/" as={Link}>Our Vision</Nav.Link>
                            <NavDropdown title="Other" id="collasible-nav-dropdown" drop="start">
                                <NavDropdown.Item to="/" as={Link}>Contact Us</NavDropdown.Item>
                                <NavDropdown.Item to="/" as={Link}>About Us</NavDropdown.Item>
                                <NavDropdown.Item to="/" as={Link}>Terms and conditions </NavDropdown.Item>
                                <NavDropdown.Item to="/" as={Link}>Privacy policy</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex" style={{margin: 'auto'}}>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="btnGroupAddon"
                                />
                                <InputGroup.Text id="btnGroupAddon"><FontAwesomeIcon icon={ faSearch } color={'green'}/></InputGroup.Text>
                            </InputGroup>
                        </Form>
                        <Nav>
                            {email!=null && email!="" ?
                                <>
                                    {role!=null && role=="manager" ?
                                        <NavDropdown title={roleas}>
                                            <NavDropdown.Item onClick={()=>changeRole("manager")}>manager</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("sales")}>sales</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("buyer")}>buyer</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("accountant")}>accountant</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("customer")}>customer</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("vendor")}>vendor</NavDropdown.Item>
                                        </NavDropdown>
                                        :
                                        <Nav.Link><Button variant="outline-secondary">{role}</Button>{' '}</Nav.Link>
                                    }
                                    <Nav.Link>
                                        <DropdownButton title={email}>
                                            <Dropdown.Item to="/profile" as={Link}>Profile</Dropdown.Item>
                                            <NavDropdown.Divider />
                                            <Dropdown.Item to="/forgotpassword" as={Link}>Change Password</Dropdown.Item>
                                        </DropdownButton>
                                    </Nav.Link>
                                    <Nav.Link><Button variant="outline-danger" onClick={()=>Logout()}><FontAwesomeIcon icon={ faSignOutAlt } color={'#04FAA1'}/> Logout</Button>{' '}</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link to="/register" as={Link}><Button variant="outline-primary"><FontAwesomeIcon icon={ faUserPlus } color={'#04FAA1'}/> Register</Button>{' '}</Nav.Link>
                                    <Nav.Link to="/login" as={Link}><Button variant="outline-danger"><FontAwesomeIcon icon={ faSignInAlt } color={'#04FAA1'}/> Login</Button>{' '}</Nav.Link>
                                </>
                            }
                            </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div style={{justifyContent: 'center', display: 'flex', width: '100%', backgroundColor:'#04FAA1', border: '1px solid gray', paddingLeft: '20%', paddingRight: '20%', paddingTop: '5px', paddingBottom: '5px'}}>
                {/* <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#04FAA1', border: '1px solid gray', paddingLeft: '2%', paddingRight: '2%'}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{margin: 'auto'}}> */}
                            <NavDropdown title="Dashboard" id="collasible-nav-dropdown" style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {(roleas == "manager") &&
                                <>
                                    <NavDropdown title="Pool Management" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown title="Customer Pool" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/addcustomerpool" as={Link}>Add Pool</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allcustomerpools" as={Link}>View Pools</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Vendor Pool" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/addvendorpool" as={Link}>Add Pool</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allvendorpools" as={Link}>View Pools</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Manager Pool" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/addmanagerpool" as={Link}>Add Pool</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allmanagerpools" as={Link}>View Pools</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Customer Vendor Cross Pool" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/addcustomervendorpool" as={Link}>Add Cross Pool</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allcustomervendorpools" as={Link}>View Customer Vendor Pools</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Manager Customer Cross Pool" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/addcustomermanagerpool" as={Link}>Add Manager Customer Pool</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allcustomermanagerpools" as={Link}>View Manager Customer Pools</NavDropdown.Item>
                                        </NavDropdown>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    <NavDropdown title="Inventory Management" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown title="Item" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/additem" as={Link}>Add Item</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allitems" as={Link}>View Items</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Item Category" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/additemcategory" as={Link}>Add Item Category</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allitemcategories" as={Link}>View Item Categories</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Item Unit" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/additemunits" as={Link}>Add Item Unit</NavDropdown.Item>
                                            <NavDropdown.Divider /> 
                                            <NavDropdown.Item to="/allitemunits" as={Link}>View Item Units</NavDropdown.Item> 
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Item Grade" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/additemgrades" as={Link}>Add Item Grade</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/allitemgrades" as={Link}>View Item Grades</NavDropdown.Item>
                                        </NavDropdown>
                                    </NavDropdown>
                                    <NavDropdown.Divider />

                                </>
                                }   
                                 {(roleas == "buyer") &&
                                <>
                                    <NavDropdown title="Transport Labour" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown title="Transport Labour from Vendor" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/addtransportlabourfromvendor" as={Link}>Add Transport Labour</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/alltransportlabourfromvendor" as={Link}>View Transport Labour</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Transport Labour for Sales" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/addtransportlabourforsales" as={Link}>Add Transport Labour</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/alltransportlabourforsales" as={Link}>View Transport Labour</NavDropdown.Item>
                                        </NavDropdown>
                                    </NavDropdown>
                                </>
                                }   
                                {( roleas == "vendor") &&
                                    <>
                                    <NavDropdown title="Inventory Management" drop="right" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown title="Add Item" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/vendors_additem" as={Link}>Add Item</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/vendors_allitems" as={Link}>View Items</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Add Address" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/vendors_add_address" as={Link}>Add new pickup address</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/vendors_all_addresses" as={Link}>All addresses</NavDropdown.Item> 
                                        </NavDropdown>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="sales" || roleas=="manager" || roleas=="vendor") &&
                                <>
                                    <NavDropdown title="Order Management" id="collasible-nav-dropdown" drop="right"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        
                                        {(roleas=="sales") &&
                                            <>
                                            <NavDropdown title="Order" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                                <NavDropdown.Item to="/createorder" as={Link}>Create Order</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item to="/allorders" as={Link}>View Orders</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item to="/approvedorders" as={Link}>View Approved Orders</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item to="/pendingorders" as={Link}>View Pending Orders</NavDropdown.Item>
                                            </NavDropdown>
                                            </>
                                        }
                                        {(roleas=="manager") &&
                                            <>
                                        <NavDropdown title="Order" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                              <NavDropdown.Item to="/allorders" as={Link}>View All Orders</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item to="/approvedorders" as={Link}>View Approved Orders</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item to="/pendingorders" as={Link}>View Pending Orders</NavDropdown.Item>
                                            </NavDropdown>
                                        <NavDropdown.Divider />
                                            </>
                                         }   
                                        {(roleas=="sales") &&
                                            <>
                                                <NavDropdown.Divider />
                                                <NavDropdown title="Customer Address" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                                    <NavDropdown.Item to="/customer_add_address" as={Link}>Add new customer address</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/customer_all_addresses" as={Link}>All Customer addresses</NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                        }
                                        {(roleas=="vendor" ) &&
                                            <>
                                                <NavDropdown title="Purchase Order" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                                    <NavDropdown.Item to="/All_Purchase_Orders" as={Link}>View Purchase Orders</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Pending_Purchase_Orders" as={Link}>View Pending orders</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Accepted_Purchase_Orders" as={Link}>View Accepted orders </NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                        }
                                        {(roleas=="manager" ) &&
                                            <>
                                                <NavDropdown title="Purchase Order" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                                    <NavDropdown.Item to="/All_Purchase_Orders" as={Link}>View Purchase Orders</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Pending_Purchase_Orders" as={Link}>View Pending Purchase orders</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Accepted_Purchase_Orders" as={Link}>View Accepted Purchase orders </NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Purchase_Order_Confirm" as={Link}>View Purchase Order Confirm</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Pending_Purchase_Order_Confirm" as={Link}>View Pending Purchase Confirm</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Accepted_Purchase_Order_Confirm" as={Link}>View Accepted Purchase Confirm</NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                        }
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown title="Delivery Management" id="collasible-nav-dropdown" drop="right"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        {(roleas=="sales") &&
                                            <>
                                            <NavDropdown title="Dispatch For Delivery" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                                <NavDropdown.Item to="/adddispatchfordelivery" as={Link}>Create Dispatch For Delivery</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item to="/alldispatchfordelivery" as={Link}>All Dispatch For Delivery</NavDropdown.Item>
                                            </NavDropdown>
                                            </>
                                        }
                                        </NavDropdown>
                                    </>
                                }
                            </NavDropdown>
                            <NavDropdown title="User Management" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {roleas=="manager" &&
                                    <>
                                    <NavDropdown title="User" drop="right" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/register" as={Link}>Add User</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/allusers" as={Link}>View Users</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    <NavDropdown drop="right" title="User Category" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/addusercategory" as={Link}>Add User Category</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/allusercategories" as={Link}>View User Categories</NavDropdown.Item>
                                    </NavDropdown>
                                    </>
                                }
                                {(roleas=="buyer" ) &&
                                    <>
                                    <NavDropdown drop="right" title="Vendor" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/register" as={Link}>Add Vendor</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/vendordetails" as={Link}>View Vendor</NavDropdown.Item>
                                    </NavDropdown>
                                    </>
                                }
                                {(roleas=="sales") &&
                                    <>
                                    <NavDropdown drop="right" title="Customer" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/register" as={Link}>Add Customer</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/customerdetails" as={Link}>View Customers</NavDropdown.Item>
                                    </NavDropdown>
                                    </>
                                }
                            </NavDropdown>
                            <NavDropdown title="Reports" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {/* <NavDropdown.Item to="/allitems" as={Link}>Items</NavDropdown.Item><NavDropdown.Divider /> */}
                                {/* <NavDropdown.Item to="/allitems" as={Link}>Sales Order</NavDropdown.Item><NavDropdown.Divider /> */}
                                 {( roleas=="manager") &&
                                    <>
                                    <NavDropdown drop="right" title="Disabled" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/disabled_all_items" as={Link}>Disabled Items</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_item_categories" as={Link}>Disabled ItemCategory</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_item_unit" as={Link}>Disabled Item Unit</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_item_grade" as={Link}>Disabled Item Grade</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_users" as={Link}>Disabled Users</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_user_categories" as={Link}>Disabled User Category</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabledcustomerdetails" as={Link}>Disabled Customers</NavDropdown.Item>
                                    </NavDropdown>
                                    {/* <NavDropdown.Divider />
                                    <NavDropdown drop="right" title="Invoice" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/create_invoice" as={Link}>Create Invoice</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/all_invoice" as={Link}>All Invoices</NavDropdown.Item>
                                    </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown  drop="right" title="Purchase Order" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/Accepted_Purchase_Orders" as={Link}>Accepted Purchase Order</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Declined_Purchase_Orders" as={Link}>All Declined PurchaseOrders</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    <NavDropdown drop="right" title="GRN" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/create_grn" as={Link}>Create GRN</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/all_grn" as={Link}>All GRNs</NavDropdown.Item>
                                    </NavDropdown> */}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/order_items_summary" as={Link}>Order Items Summary</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {( roleas=="manager" || roleas=="accountant") &&
                                    <>
                                        <NavDropdown.Item to="/allcompletedorders" as={Link}>View Completed Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {( roleas=="manager" || roleas=="buyer") &&
                                    <>
                                        <NavDropdown.Item to="/allcompletedpurchaseorders" as={Link}>All Completed Purchase Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {( roleas=="manager" || roleas=="sales") &&
                                    <>
                                        <NavDropdown.Item to="/alldispatchitems" as={Link}>All Dispatch order items</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {( roleas=="manager" || roleas=="sales" || roleas=="buyer") &&
                                    <>
                                        <NavDropdown.Item to="/allreceiveditems" as={Link}>All Received order items</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="manager" || roleas=="sales") &&
                                    <>
                                        <NavDropdown.Item to="/ordersummary" as={Link}>Order Summary</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/allorderstatus" as={Link}>All Order Status</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {( roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/customer_account_delete_requests" as={Link}>Delete Account Requests</NavDropdown.Item>
                                    </>
                                }
                            </NavDropdown>
                            {/* <NavDropdown title="Inventory" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/allinventory" as={Link}>Show Inventory</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/allinventory" as={Link}>All Inventories</NavDropdown.Item>
                            </NavDropdown> */}
                            <NavDropdown title="Assignment" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {/* <NavDropdown.Item to="/allitems" as={Link}>Delivery</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/allitems" as={Link}>Show All Deliveries</NavDropdown.Item>
                                <NavDropdown.Divider /> */}
                                {(roleas=="buyer" || roleas=="manager" || roleas=="vendor") &&
                                    <> 
                                    <NavDropdown drop="right" title="Pickup Assignment" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%'}}>
                                    {(roleas=="buyer" || roleas=="manager") &&
                                        <> 
                                            <NavDropdown.Item to="/all_pickup_assignment" as={Link}>View Pickup Assignment</NavDropdown.Item>        
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/all_pending_pickup_assignment" as={Link}>View Pending Pickup Assignment</NavDropdown.Item>        
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/all_accepted_pickup_assignment" as={Link}>View Accepted Pickup Assignment</NavDropdown.Item>        
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/all_pickup_assignment_confirm_buyer" as={Link}>View Pickup Confirmed by Buyer</NavDropdown.Item>
                                            <NavDropdown.Divider /> 
                                        </>
                                        }
                                        {(roleas=="vendor" || roleas=="manager" ) &&
                                            <> 
                                                <NavDropdown.Item to="/all_pickup_assignment_confirm" as={Link}>All Pickup Assignment Confirm</NavDropdown.Item> 
                                                <NavDropdown.Divider /> 
                                                <NavDropdown.Item to="/all_pending_pickup_assignment_confirm_vendor" as={Link}>All Pending Pickup Assignment Confirm Vendor</NavDropdown.Item> 
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item to="/all_accepted_pickup_assignment_confirm_vendor" as={Link}>All Accepted Pickup Assignment Confirm Vendor</NavDropdown.Item>        
                                                <NavDropdown.Divider />      
                                            </>
                                        }
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="accountant" || roleas=="manager"|| roleas=="sales" ) &&
                                    <> 
                                        <NavDropdown  drop="right" title="Delivery Assignment" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/All_Delivery_Assignment" as={Link}>View Delivery Assignment</NavDropdown.Item>        
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/All_Pending_Delivery_Assignment" as={Link}>View Pending Delivery Assignment</NavDropdown.Item>        
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item to="/All_Accepted_Delivery_Assignment" as={Link}>View Accepted Delivery Assignment</NavDropdown.Item>        
                                        </NavDropdown>
                                        <NavDropdown.Divider />
                                </>
                                }
                                {(roleas=="accountant" || roleas=="manager"|| roleas=="sales" || roleas=="customer"  ) &&
                                    <> 
                                        <NavDropdown drop="right" title="Delivery" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                            <NavDropdown.Item to="/All_Delivery" as={Link}>All Delivery</NavDropdown.Item>        
                                           
                                            {(roleas=="accountant" || roleas=="manager"|| roleas=="sales"  ) &&
                                                <> 
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item to="/All_Confirm_Delivery" as={Link}>All Confirm Delivery</NavDropdown.Item>        
                                                </>
                                            }
                                        </NavDropdown>
                                    </>
                                }
                            </NavDropdown>
                        {/* </Nav>
                    </Navbar.Collapse>
                </Navbar> */}
                </div>
                {typeof token == 'object' ?
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>                        
                        <Route path="/forgotpassword" render={(props) => <Forgotpassword {...props} />} exact/>
                        <Route path="/addaddress/:userid" render={(props) => <AddAddress {...props} />} exact />
                        <Route path="/addbankdetails/:userid" render={(props) => <AddBankDetails {...props} />} exact />
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route component={PageNotFound}  />
                    </Switch>
                :
                <Switch>  
                <Route path="/register">
                    <Register  roleas={roleas} host={host}/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/scanner">
                    <Scanner/>
                </Route>
                <Route path="/barcode">
                    <Barcode/>
                </Route>
                <Route path="/allorders">
                    <AllOrders roleas={roleas} host={host}/>
                </Route>
                <Route path="/approvedorders">
                    <ApprovedOrders roleas={roleas} host={host}/>
                </Route>
                <Route path="/pendingorders">
                    <PendingOrders roleas={roleas} host={host}/>
                </Route>
                <Route path="/allusercategories">
                    <AllUserCategories/>
                </Route>
                {/* <PrivateRoutes exact path="/allusercategory" name="Allusercategory" component={props => <AllUserCategories {...props}/>} /> */}
                <Route path="/allitemcategories">
                    <AllItemCategories host={host}/>
                </Route>
                <Route path="/allitemunits">
                    <AllItemUnit/>
                </Route>
                <Route path="/additemunits">
                    <AddItemUnit/>
                </Route>
                <Route path="/allitemgrades">
                    <AllItemGrade/>
                </Route>
                <Route path="/additemgrades">
                    <AddItemGrade/>
                </Route>
                <Route path="/additem">
                    <AddItem/>
                </Route>
                <Route path="/allitems">
                    <AllItems host={host} />
                </Route>
                <Route path="/addcustomerpool">
                    <AddCustomerPool/>
                </Route>
                <Route path="/allcustomerpools">
                    <AllCustomerPools/>
                </Route>
                <Route path="/addvendorpool">
                    <AddVendorPool/>
                </Route>
                <Route path="/allvendorpools">
                    <AllVendorPools/>
                </Route>
                <Route path="/addcustomervendorpool">
                    <AddCustomerVendorPool/>
                </Route>
                <Route path="/allcustomervendorpools">
                    <AllCustomerVendorPools/>
                </Route>
                <Route path="/addcustomermanagerpool">
                    <AddCustomerManagerPool/>
                </Route>
                <Route path="/allcustomermanagerpools">
                    <AllCustomerManagerPools/>
                </Route>
                <Route path="/addmanagerpool">
                    <AddManagerPool/>
                </Route>
                <Route path="/allmanagerpools">
                    <AllManagerPools/>
                </Route>
                <Route path="/allusers">
                    <AllUsers roleas={roleas}/>
                </Route>
                <Route path="/addtransportlabourforsales">
                    <AddTransportLabour/>
                </Route>
                <Route path="/alltransportlabourforsales">
                    <AllTransportLabourForSales/>
                </Route>
                <Route path="/addtransportlabourfromvendor">
                    <AddTransportLabourFromVendor/>
                </Route>
                <Route path="/alltransportlabourfromvendor">
                    <AllTransportLabourFromVendor/>
                </Route>
                <Route path="/viewtransportlabourforsales/:id" render={(props) => <ViewTransportLabourForSales roleas={roleas} host={host} {...props} />} exact />
                <Route path="/viewtransportlabourfromvendor/:id" render={(props) => <ViewTransportLabourFromVendor roleas={roleas} host={host} {...props} />} exact />
                <Route path="/vieworder/:orderid" render={(props) => <ViewOrder roleas={roleas} host={host} {...props} />} exact />
                <Route path="/editorder/:orderid" render={(props) => <EditOrder roleas={roleas} host={host} {...props} />} exact />
                <Route path="/edititem/:itemid" render={(props) => <EditItem {...props} />} exact />
                <Route path="/disabled_item/:itemid" render={(props) => <EditItem {...props} />} exact />
                <Route path="/edituser/:userid" render={(props) => <EditUser roleas={roleas} {...props} />} exact />
                <Route path="/viewuser/:userid" render={(props) => <ViewUser roleas={roleas} {...props} />} exact />
                <Route path="/editaddress/:addressid" render={(props) => <EditAddress {...props} />} exact />
                <Route path="/editbankdetails/:bankid" render={(props) => <EditBankDetails {...props} />} exact />
                <Route path="/edititemcategory/:itemCategoryid" render={(props) => <EditItemCategory {...props} />} exact />
                <Route path="/edititemunit/:itemUnitid" render={(props) => <EditItemUnit {...props} />} exact />
                <Route path="/edititemgrade/:itemGradeid" render={(props) => <EditItemGrade {...props} />} exact />
                <Route path="/editusercategory/:userCategoryid" render={(props) => <EditUserCategory {...props} />} exact />
                <Route path="/forgotpassword" render={(props) => <Forgotpassword {...props} />}  exact/>
                <Route path="/edit_vendor_address/:addressid" render={(props) => <VendorEditAddress  {...props} />} exact />
                <Route path="/edit_customer_pool/:id" render={(props) => <EditCustomerPool {...props} />} exact />
                <Route path="/edit_vendor_pool/:id" render={(props) => <EditVendorPool {...props} />} exact />
                <Route path="/edit_manager_pool/:id" render={(props) => <EditManagerPool {...props} />} exact />
                <Route path="/edit_customer_vendor_pool/:id" render={(props) => <EditCustomerVendorPool {...props} />} exact />
                <Route path="/createorder">
                    <CreateOrder/>
                </Route>
                <Route path="/addvendor">
                    <Buyer_add_vendor/>
                </Route>
                <Route path="/vendordetails">
                    <Vendor_details/>
                </Route>
                <Route path="/addcustomer">
                    <Add_customer/>
                </Route>
                <Route path="/customerdetails">
                    <Customer_details/>
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/additemcategory" exact>
                <AddItemCategory/>
                </Route>
                <Route path="/addusercategory" exact>
                    <AddUserCategory/>
                </Route>
                <Route path="/addaddress/:userid" render={(props) => <AddAddress {...props} />} exact />
                <Route path="/addbankdetails/:userid" render={(props) => <AddBankDetails {...props} />} exact />
                <Route path="/Create_Indent">
                    <Create_Indent/>
                </Route>
                <Route path="/All_Indents">
                    <All_Indents/>
                </Route>
                <Route path="/Create_Purchase_Order">
                    <Create_Purchase_Order/>
                </Route>
                <Route path="/Edit_Indent/:indentid"  render={(props) => <Edit_Indent {...props} />} exact />
                           
                <Route path="/All_Purchase_Orders">
                    <All_Purchase_Orders/>
                </Route>
                <Route path="/All_Purchase_Order_Confirm">
                    <All_Purchase_Order_Confirm/>
                </Route>
                <Route path="/Edit_Purchase_Order/:purchaseid" render={(props) => <Edit_Purchase_Order roleas={roleas} {...props} />} exact />
                <Route path="/Edit_Vendor_Purchase_Order/:purchaseid" render={(props) => <Edit_Vendor_Purchase_Order {...props} />} exact />
                <Route path="/View_Purchase_Order/:purchaseid" render={(props) => <View_Purchase_Order roleas={roleas} {...props} />} exact />
                <Route path="/Edit_Purchase_Order_confirm/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm {...props} />} exact />
                <Route path="/Edit_Purchase_Order_confirm2/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm2 {...props} />} exact />
                <Route path="/Edit_Purchase_Order_confirm3/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm3 roleas={roleas} {...props} />} exact />
                <Route path="/View_Purchase_Order_confirm3/:purchaseconfirmid" render={(props) => <View_Purchase_Order_Confirm3 roleas={roleas} {...props} />} exact />
     
                <Route path="/disabled_all_items">
                    <DisabledAllItems host={host}/>
                </Route>
                <Route path="/disabled_all_item_categories">
                    <DisabledAllItemCategories host={host}/>
                </Route>
                <Route path="/disabled_all_item_grade">
                    <DisabledAllItemGrade/>
                </Route>
                <Route path="/disabled_all_item_unit">
                    <DisabledAllItemUnit/>
                </Route>
                <Route path="/disabled_all_users">
                    <DisabledAllUsers/>
                </Route>
                <Route path="/disabled_all_user_categories">
                    <DisabledAllUserCategories/>
                </Route>
                <Route path="/disabledcustomerdetails">
                    <Disabled_Customer_details/>
                </Route>
                
                <Route path="/disablededititem/:itemid" render={(props) => <DisabledEditItem {...props} />} exact />
                <Route path="/disablededititemcategory/:itemCategoryid" render={(props) => <DisabledEditItemCategory host={host} {...props} />} exact />
                <Route path="/disablededititemgrade/:itemGradeid" render={(props) => <DisabledEditItemGrade {...props} />} exact />
                <Route path="/disablededititemunit/:itemUnitid" render={(props) => <DisabledEditItemUnit {...props} />} exact />
                <Route path="/disablededituser/:userid" render={(props) => <DisabledEditUser host={host} {...props} />} exact />
                <Route path="/disablededitusercategory/:userCategoryid" render={(props) => <DisabledEditUserCategory host={host} {...props} />} exact />
                
                {/* <Route path="/delete_account_requests">
                    <DeleteAccountRequests/>
                </Route> */}

                <Route path="/customer_account_delete_requests">
                    <CustomerAccountDeleteRequests/>
                </Route>
                <Route path="/All_Pending_Purchase_Orders">
                    <All_Pending_Purchase_Orders roleas={roleas}/>
                </Route>
                <Route path="/All_Accepted_Purchase_Orders">
                    <All_Accepted_Purchase_Orders/>
                </Route>
                <Route path="/Edit_Purchase_Order_Price/:purchaseid" render={(props) => <Edit_Purchase_Order_Price {...props} />} exact />
                <Route path="/Accepted_Purchase_Orders">
                    <Accepted_Purchase_Orders/>
                </Route>
                
                <Route path="/allinventory">
                    <AllInventory/>
                </Route>
                <Route path="/All_Pending_Purchase_Order_Confirm">
                    <All_Pending_Purchase_Order_Confirm roleas={roleas}/>
                </Route>
                <Route path="/All_Accepted_Purchase_Order_Confirm">
                    <All_Accepted_Purchase_Order_Confirm roleas={roleas}/>
                </Route>
                <Route path="/all_invoice">
                    <AllInvoice/>
                </Route>
                <Route path="/create_invoice">
                    <CreateInvoice/>
                </Route>
                <Route path="/vendors_additem">
                    <VenodrsAddItem/>
                </Route>
               <Route path="/vendors_add_address">
                  <VendorAddAddress />
               </Route>
               <Route path="/vendors_all_addresses">
                   <VendorAllAddress />
               </Route>
               <Route path="/customer_add_address">
                  <CustomerAddAddress />
               </Route>
               <Route path="/customer_all_addresses">
                   <CustomerAllAddress />
               </Route>
                <Route path="/vendors_allitems">
                    <VendorsAllItems roleas={roleas}/>
                </Route>    
                <Route path="/vendors_edititem/:itemid" render={(props) => <VendorsEditItem roleas={roleas} {...props} />} exact />       
                <Route path="/vendors_view_item/:itemid" render={(props) => <VendorsViewItem roleas={roleas} {...props} />} exact />        
                
                <Route path="/All_Declined_Purchase_Orders">
                    <All_Declined_Purchase_Orders/>
                </Route>    
                <Route path="/all_grn">
                    <AllGrn/>
                </Route>
                <Route path="/create_grn">
                    <CreateGrn/>
                </Route>
                <Route path="/order_items_summary">
                    <OrderItemsSummary host={host}/>
                </Route>
                <Route path="/editorderitem/:orderid" render={(props) => <EditOrderItem {...props} />} exact />
                <Route path="/all_pickup_assignment">
                    <All_Pickup_Assignment/>
                </Route>
                <Route path="/Edit_Pickup_Assignment/:pickupId" render={(props) => <Edit_Pickup_Assignment {...props} />} exact />
                <Route path="/Edit_Pickup_Assignment2/:pickupId" render={(props) => <Edit_Pickup_Assignment2 roleas={roleas} {...props} />} exact />
                <Route path="/View_Pickup_Assignment2/:pickupId" render={(props) => <View_Pickup_Assignment2 roleas={roleas} {...props} />} exact />
                {/* <Route path="/Edit_Purchase_Order_confirm3/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm3 {...props} />} exact /> */}
                <Route path="/all_pending_pickup_assignment">
                    <All_Pending_Pickup_Assignment roleas={roleas} />
                </Route>
                <Route path="/all_accepted_pickup_assignment">
                    <All_Accepted_Pickup_Assignment roleas={roleas} />
                </Route>
                <Route path="/all_pickup_assignment_confirm">
                    <All_Pickup_Assignment_Confirm/>
                </Route>
                    
                <Route path="/all_pending_pickup_assignment_confirm_vendor">
                    <All_Pending_Pickup_Assignment_Confirm_Vendor roleas={roleas} />
                </Route>
                <Route path="/all_accepted_pickup_assignment_confirm_vendor">
                    <All_Accepted_Pickup_Assignment_Confirm_Vendor  />
                </Route>
                <Route path="/all_pickup_assignment_confirm_buyer">
                    <All_Pickup_Assignment_Confirm_Buyer roleas={roleas}/>
                </Route>
                <Route path="/Edit_Pickup_Assignment_Confirm/:pickupConfirmId" render={(props) => <Edit_Pickup_Assignment_Confirm {...props} />} exact />
                <Route path="/View_Pickup_Assignment_Confirm/:pickupConfirmId" render={(props) => <View_Pickup_Assignment_Confirm {...props} />} exact />
                <Route path="/Edit_Pickup_Assignment_Confirm_Buyer/:pickupConfirmId" render={(props) => <Edit_Pickup_Assignment_Confirm_Buyer roleas={roleas} {...props} />} exact />
                <Route path="/View_Pickup_Assignment_Confirm_Buyer/:pickupConfirmId" render={(props) => <View_Pickup_Assignment_Confirm_Buyer roleas={roleas} {...props} />} exact />
                
                <Route path="/allcompletedorders">
                    <AllCompletedOrders/>
                </Route>    
                <Route path="/alldispatchitems">
                    <Alldispatchitems/>
                </Route>        
                <Route path="/editCompletedorder/:orderid" render={(props) => <EditCompletedOrder {...props} />} exact />    
                    
                <Route path="/allreceiveditems">
                    <AllReceiveditems/>
                </Route>        
                <Route path="/editreceivedorder/:id" render={(props) => <EditReceivedOrder {...props} />} exact />

                <Route path="/adddispatchfordelivery">
                    <AddDispatchForDelivery/>
                </Route>   
                <Route path="/alldispatchfordelivery">
                    <AllDispatchForDelivery/>
                </Route>        
                <Route path="/viewdispatchfordelivery/:id" render={(props) => <ViewDispatchForDelivery {...props} />} exact />
                
                <Route path="/All_Delivery_Assignment">
                    <All_Delivery_Assignment/>
                </Route>    
                <Route path="/editCompletedorder2/:orderid" render={(props) => <EditCompletedOrder2 {...props} />} exact />    
                <Route path="/All_Pending_Delivery_Assignment">
                    <All_Pending_Delivery_Assignment/>
                </Route> 
                <Route path="/All_Accepted_Delivery_Assignment">
                    <All_Accepted_Delivery_Assignment/>
                </Route>   
                <Route path="/Edit_Accepted_Delivery_Assignment/:deliveryid" render={(props) => <Edit_Accepted_Delivery_Assignment {...props} />} exact />
                <Route path="/Edit_Delivery_Assignment/:deliveryid" render={(props) => <Edit_Delivery_Assignment {...props} />} exact />
                    
                <Route path="/All_Delivery">
                    <All_Delivery/>
                </Route>
                <Route path="/All_Confirm_Delivery">
                    <All_Confirm_Delivery/>
                </Route>    
                <Route path="/allcompletedpurchaseorders">
                    <All_Completed_Purchase_Orders/>
                </Route>
                <Route path="/View_Dispatch_order_items/:id" render={(props) => <View_dispatch_order_items {...props} />} exact />
                <Route path="/View_Completed_Purchase_Order/:id" render={(props) => <View_Completed_Purchase_Order {...props} />} exact />
                <Route path="/Edit_Accepted_Delivery/:deliveryid" render={(props) => <Edit_Accepted_Delivery {...props} />} exact />
                <Route path="/Edit_Confirm_Delivery/:deliveryid" render={(props) => <Edit_Confirm_Delivery {...props} />} exact />
                <Route path="/ordersummary">
                    <OrderSummary/>
                </Route>
                <Route path="/viewordersummary/:orderid" render={(props) => <ViewOrderSummary roleas={roleas} host={host} {...props} />} exact />
                <Route path="/allorderstatus">
                    <All_order_status/>
                </Route>
                <Route component={PageNotFound}  />
                </Switch>
            }
        </Router>
    )
}

export default NavBar;