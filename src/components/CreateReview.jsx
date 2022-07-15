import * as React from 'react';
import ImageUploading from 'react-images-uploading';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import {
    Flex,
    TextField,
    Card,
    CheckboxField,
    Image,
    Link,
    TextAreaField
  } from '@aws-amplify/ui-react';

export function CreateReview() {
    const sportsCardId = useParams().id;
    const [images, setImages] = React.useState([]);
    const [name, setName] = React.useState("");
    const [review, setReview] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [rating, setRating] = React.useState(0.0)
    const maxNumber = 10;
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
            dateOfReview: Date.now() + "",
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
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Click or Drop here
                                </Button>
                                &nbsp;
                                <Button onClick={onImageRemoveAll}>Remove all images</Button>
                                {imageList.map((image, index) => (
                                    <div key={index}>
                                        <Image src={image['data_url']} alt=""/>
                                        <div>
                                        <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                        <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                     </ImageUploading>
                    <Flex direction={"row"} justifyContent={"flex-end"}>
                        <Button variant='success' onClick={handleNewReview}>Save</Button>
                        <Link href={`/sportscards/${sportsCardId}/reviews`}><Button variant='primary'>Close</Button></Link>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}

export default CreateReview;