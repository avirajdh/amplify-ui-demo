import * as React from 'react';
import ImageUploading from 'react-images-uploading';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
    Flex,
    TextField,
    Card,
    CheckboxField,
    Image,
    Link,
    TextAreaField,
    Button
} from '@aws-amplify/ui-react';

export function CreateReview() {
    const sportsCardId = useParams().id;
    const [images, setImages] = React.useState([]);
    const [name, setName] = React.useState("");
    const [review, setReview] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [rating, setRating] = React.useState(0.0)
    const maxNumber = 1;

    const date = new Date(Date.now());
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"]
    const dateFormatted = days[date.getDay()] + " " + months[date.getMonth()] + " "
    + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes();

    const backToReview = "../sportscards/" + sportsCardId + "/reviews";

    const onChange = (imageList) => {       
        setImages(imageList);
        console.log("Image List", imageList)
    };
    const saveName = (e) => {
        setName(e.target.value)
    }

    const saveReview = (e) => {
        setReview(e.target.value)
    }

    const saveVerifyStatus = (e) => {
        setVerified(e.target.checked)
    }
    const saveRating = (e) => {
        setRating(e.target.value)
    }
    const handleNewReview = () => {
        const newReview = {
            cardId: parseInt(sportsCardId, 10),
            customerName: name,
            dateOfReview: date.getHours() >= 12 ? dateFormatted + " PM" : dateFormatted + " AM",
            reviewText: review,
            isLiked: false,
            imageSrc: images[0]['data_url'],
            verified: verified,
            rating: rating
        }

        fetch('/api/reviews', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newReview)
        }).then((response) => {
            console.log("POST response: ", response)
            return response.json()
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        })

    }
    return(
        
        <Flex direction={"column"} maxWidth={"60rem"} marginLeft={"3rem"}>
            <Card padding={"1 rem"} margin={"1 rem"}
            boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
            border="1px solid var(--amplify-colors-black)">
                <Flex direction={"column"} gap={"1rem"}>
                    <TextField label="Name" onInput={saveName}/>
                    <TextAreaField label="Your Review of the Product" onInput={saveReview}/>
                    <TextField max={5.0} label="Rating" onInput={saveRating} width={"5rem"}/>
                    <CheckboxField label="I have purchased this product from Cards Stop" onChange={saveVerifyStatus}/>
                    <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}
                    dataURLKey="data_url">
                        {({imageList,onImageUpload,onImageRemoveAll,onImageUpdate,
                        onImageRemove,isDragging,dragProps,}) => (
                            <div>
                                <Button
                                style={isDragging ? { color: 'red' } : {marginRight:'1em', marginBottom:'1em'}}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Click or Drop here
                                </Button>
                                &nbsp;
                                <Button style={{marginBottom:'1em'}} onClick={onImageRemoveAll}>Remove all images</Button>
                                {imageList.map((image, index) => (
                                    <div key={index}>
                                        <Image src={image['data_url']} alt=""/>
                                        <div>
                                        <Button variation="primary" style={{marginRight:'1em',marginBottom:'1em'}} onClick={() => onImageUpdate(index)}>Update</Button>
                                        <Button variation="primary" style={{marginRight:'1em',marginBottom:'1em'}} onClick={() => onImageRemove(index)}>Remove</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                     </ImageUploading>
                    <Flex direction={"row"} justifyContent={"flex-end"}>
                        <Button variation='primary' onClick={handleNewReview}>Save</Button>
                        <Link as={ReactRouterLink} to={backToReview}><Button variation='primary'>Close</Button></Link>                      
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}

export default CreateReview;
