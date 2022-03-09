import React from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
 
function Scanner() {
 
  const [ data, setData ] = React.useState('Not Found');
 
  return (
    <>
      <BarcodeScannerComponent
        width="100%"
        height="100%"
        onUpdate={(err, result) => {
          if (result) setData(result.text)
          else setData('Not Found')
        }}
      />
      {data && data!="Not Found" &&
        <h6 style={{textAlign: 'center'}}>{data}</h6>
      }
    </>
  )
}
 
export default Scanner;