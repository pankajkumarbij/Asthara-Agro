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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


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
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
									<img src="https://www.sparksuite.com/images/logo.png" style="width: 100%; max-width: 300px" />
								</td>

								<td>
									Invoice #: 123<br />
									Created: January 1, 2015<br />
									Due: February 1, 2015
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									${order[0].name}.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>Check</td>

					<td>1000</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>Website design</td>

					<td>$300.00</td>
				</tr>

				<tr class="item">
					<td>Hosting (3 months)</td>

					<td>$75.00</td>
				</tr>

				<tr class="item last">
					<td>Domain name (1 year)</td>

					<td>$10.00</td>
				</tr>

				<tr class="total">
					<td></td>

					<td>Total: $385.00</td>
				</tr>
			</table>
		</div>
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
          <Card style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Card.Title style={{ flex: 1, }} title="View Order" />
              <TouchableOpacity onPress={() => askPermission()}><FontAwesomeIcon icon={ faFilePdf } color="red" size="30" /></TouchableOpacity>
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