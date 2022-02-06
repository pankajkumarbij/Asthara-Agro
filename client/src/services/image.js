import {url} from '../utils/url';

//upload image
export function uploadImage(file){
    const data = new FormData();
    // Update the formData object
    data.append(
        "file",
        file
    );

    return fetch(`${url}/uploadfile`, {
        method: 'POST',
        body:data,
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(Image => {
        console.log("called");
        return Image.img;
    });
}