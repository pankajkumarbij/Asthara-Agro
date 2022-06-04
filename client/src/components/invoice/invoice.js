import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View, Platform, ScrollView, SafeAreaView } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Alert } from 'react-native';
import { Order_by_id } from '../../services/order_api';
import { useHistory } from 'react-router-dom';
import { TextInput, Card, Provider, DefaultTheme, DataTable, Title, Button } from 'react-native-paper';


export default function ExportPdf({ route }, props) {

  let history = useHistory();

  var orderid = "";
  if (Platform.OS == "android") {
    orderid = route.params.orderId;
  }
  else {
    orderid = props.match.params.orderid;
  }

  const [order, setOrder] = useState('name:"",email:"",address:"",country:"",mobile_no:"",landmark:"",district:"",state:"",postal_code:""');

  useEffect(() => {

    if (orderid) {
      Order_by_id(orderid)
        .then(result => {
          setOrder(result);
        })
    }

  }, [orderid, order]);

  const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Invoice</title>
            <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
            <style>
              ${htmlStyles}
            </style>
          </head>
          <body>
            <header>
              <h1>Invoice</h1>
              <address> 
              <p>${[...order][0].name}</p>
              <p>${[...order][0].email}</p>
              </address>
            </header>
            <article>
              <h1>Recipient</h1>
              <address>
                 <p>${[...order][0].address}<br>c/o ${[...order][0].mobile_no}</p>
              </address>
              <table class="meta">
                <tr>
                  <th><span>Invoice #</span></th>
                  <td><span>101138</span></td>
                </tr>
                <tr>
                  <th><span>Date</span></th>
                   <td><span>${[...order][0].district}</span></td>
                </tr>
                <tr>
                  <th><span>Amount Due</span></th>
                   <td><span id="prefix"></span><span>${[...order][0].state}</span></td>
                </tr>
              </table>
              <table class="inventory">
                <thead>
                  <tr>
                    <th><span>Item</span></th>
                    <th><span>Description</span></th>
                    <th><span>Rate</span></th>
                    <th><span>Quantity</span></th>
                    <th><span>Price</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span>Front End Consultation</span></td>
                    <td><span>Experience Review</span></td>
                     <td><span data-prefix>$</span><span></span></td>
                    <td><span>4</span></td>
                     <td><span data-prefix>$</span><span>${[...order][0].postal_code}</span></td>
                  </tr>
                </tbody>
              </table>
              <table class="balance">
                <tr>
                  <th><span>Total</span></th>
                   <td><span data-prefix></span>${[...order][0].country}<span>  ${[...order][0].email}</span></td>
                </tr>
                <tr>
                  <th><span>Amount Paid</span></th>
                  <td><span data-prefix>$</span><span>0.00</span></td>
                </tr>
                <tr>
                  <th><span>Balance Due</span></th>
                   <td><span data-prefix>$</span><span>${[...order][0].mobile_no}</span></td>
                </tr>
              </table>
            </article>
            <aside>
              <h1><span>Additional Notes</span></h1>
              <div>
                <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
              </div>
            </aside>
          </body>
        </html>
      `;

  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message:
              'Pdf creator needs access to Storage data in your SD Card',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  }
  const createPDF = async () => {
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'my-test',
      //File directory
      directory: 'Download',

      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open', onPress: () => openFile(file.filePath) }
    ], { cancelable: true });

  }

  const openFile = (filepath) => {
    const path = filepath;// absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={askPermission}>
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
              }}
              style={styles.ImageStyle}
            />
            <Text style={styles.text}>Download Invoice</Text>
          </TouchableOpacity>
          <Card style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Card.Title style={{ flex: 1, }} title="View Order" />
            </View>
            <Card.Content>
              {order ?
                <>
                  <TextInput style={styles.input} mode="outlined" label="Full Name" value={order[0].name} />
                  <TextInput style={styles.input} mode="outlined" label="Email" value={order[0].email} />
                  <TextInput style={styles.input} mode="outlined" label="Mobile no" value={order[0].mobile_no} />
                  <TextInput style={styles.input} mode="outlined" label="Address" value={order[0].address} multiline rows={5} />
                  <TextInput style={styles.input} mode="outlined" label="Landmark" value={order[0].landmark} />
                  <TextInput style={styles.input} mode="outlined" label="District" value={order[0].district} />
                  <TextInput style={styles.input} mode="outlined" label="State" value={order[0].state} />
                  <TextInput style={styles.input} mode="outlined" label="Country" value={order[0].country} />
                  <TextInput style={styles.input} mode="outlined" label="Pin Code" value={order[0].postal_code} />
                  {order[0].items ?
                    <DataTable>
                      <Title >All Items</Title>
                      <DataTable.Header>
                        <DataTable.Title>Item Name</DataTable.Title>
                        <DataTable.Title>unit</DataTable.Title>
                        <DataTable.Title>Quantity</DataTable.Title>
                        <DataTable.Title>Final Price</DataTable.Title>
                        <DataTable.Title>Negotiate Price</DataTable.Title>
                      </DataTable.Header>

                      {order[0].items.map((it) => (
                        <>
                          <DataTable.Row>
                            <DataTable.Cell>{it.itemName}</DataTable.Cell>
                            <DataTable.Cell>{it.itemUnit}</DataTable.Cell>
                            <DataTable.Cell>{it.quantity}</DataTable.Cell>
                            <DataTable.Cell>{it.targetPrice}</DataTable.Cell>
                            <DataTable.Cell>{it.itemNegotiatePrice}</DataTable.Cell>
                          </DataTable.Row>
                        </>
                      ))}
                    </DataTable> : null
                  }
                </> : null
              }
            </Card.Content>
          </Card>
        </View>

      </ScrollView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  // MainContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#123',
  // },
  text: {
    color: 'green',
    textAlign: 'center',
    fontSize: 25,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
  card: {
    alignSelf: 'center',
    padding: '1%',
    ...Platform.select({
      ios: {

      },
      android: {
        marginTop: '10%',
        marginBottom: '10%',
        width: '90%',
      },
      default: {
        boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
        marginTop: '4%',
        marginBottom: '4%',
        width: '75%',
      }
    })
  },
  input: {
    marginTop: '2%',
    width: '100%',
    ...Platform.select({
      ios: {

      },
      android: {

      },
      default: {

      }
    })
  },
  button: {
    marginTop: '2%',
    flex: 1,
  },
});

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

/* table */

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }

body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }

header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */

article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: left; font-size: 125%; font-weight: bold; }

/* table meta & balance */

table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }

/* table balance */

table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }

/* aside */

aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;