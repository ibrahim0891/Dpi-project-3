import { links } from "../../assets/Vars"
import BackButton from "../Components/BackButton"
import moutainPeak from "../../assets/img/mountain-peak-white-minimalist-dslzfihulnhf9wfy.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons"

import { useEffect, useRef, useState } from "react"
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage"
import { database, storage } from "../../../firebase"
import { push, ref, update } from "firebase/database"

import imageCompression from "browser-image-compression" 
import timeStamp from "../../Common/TimeStamp"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {

    const [selectedImage, setSelectedImages] = useState([])
    const [selectedFile, setSelectedFile] = useState([])
    const [postUploading , setPostUloading] = useState(false)

    const navigate = useNavigate()
    const fileSelect = useRef(null)
    let clickUpload = () => {
        if (fileSelect.current) {
            let fileSelector = fileSelect.current
            fileSelector.click()
        }
    }


    async function fileSelectChange(e) {
        const files = e.target.files;
        const promises = []; // Array to store compression promises

        // Filter valid image files
        const validImages = Array.from(files).filter(
            (file) => file && /\.(jpe?g|png|gif)$/i.test(file.name)
        );

        // Compress each image asynchronously
        for (const file of validImages) {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 600,
                useWebWorker: true,
            };
            promises.push(imageCompression(file, options)); // Assuming imageCompression function exists
        }

        // Wait for all compressions to finish
        const compressedFiles = await Promise.all(promises);

        // Create image objects with local URLs and compressed files
        const newSelectedImages = compressedFiles.map((compressedFile) => {
            const localImgUrl = URL.createObjectURL(compressedFile);
            return { localImgUrl, file: compressedFile };
        });

        // Update state arrays using spread operator and callback (assuming React)
        setSelectedImages((prevImages) => [...prevImages, ...newSelectedImages.map((image) => image.localImgUrl)]);
        setSelectedFile((prevFiles) => [...prevFiles, ...newSelectedImages.map((image) => image.file)]);
    }


    const handleXButtonCLick = (imageUrl, index) => {
        const updatedImages = selectedImage.filter((image) => image !== imageUrl);
        setSelectedImages(updatedImages)

        const updatedFiles = [...selectedFile];
        updatedFiles.splice(index, 1);
        setSelectedFile(updatedFiles);
    };

    const postUniqueKey = push(ref(database, '/')).key

    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [imageUrls, setImageUrls] = useState([])
    let createPost = async () => {
        setPostUloading(true)
        let promises = []
        selectedFile.forEach((file, index) => {
            const postStorageRef = storageRef(storage, `${localStorage.getItem('currentUser')}/${postUniqueKey}/${file.name}`)
            promises.push(uploadBytes(postStorageRef, file))

        })
        const uploadResults = await Promise.all(promises)
        const downloadURLs = uploadResults.map((uploadTask) =>
            getDownloadURL(uploadTask.ref)
        );  
        const resolvedDownloadURLs = await Promise.all(downloadURLs); 

        let post = {
            authorUID : localStorage.getItem('currentUser'),
            timestamp : timeStamp(),
            postTitle : postTitle ? postTitle : 'Nothing' ,
            postBody : postBody ? postBody : 'Nothing in postbody',
            images : resolvedDownloadURLs ? resolvedDownloadURLs : ['No images!'],
            likes : 0 ,
            comments : 0 ,
            postID : postUniqueKey
        }

        let postRef = ref(database, '/posts/'+ localStorage.getItem('currentUser')+ '/' +postUniqueKey)
        update(postRef,post).then(() => {
          console.log('Posted successfully!');
          navigate('/profile')
        })

    }

    return (
        <div>
            <BackButton buttonLink={links.home.root} titlebarText={`Create a new post!`} />
            <div className="">
                <img src={moutainPeak} className="-mb-16 border-b"/>
                <div className="font-thin m-8 flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="px-4 py-3 border text-center rounded-md w-full shadow text-2xl font-bold block placeholder-gray-400"
                        title="Set a title for your post!"
                        onChange={(e) => { setPostTitle(e.target.value) }}
                    />
                    <textarea
                        placeholder="Unleash your idea..."
                        className="text-md font-light p-4 border shadow  w-full resize-none block aspect-video focus:outline-0"
                        onChange={(e) => { setPostBody(e.target.value) }}>
                    </textarea>
                    <h3 className="font-bold text-xl text-gray-500 my-4 "> Add images</h3>
                    <div className="flex flex-wrap rounded-2xl overflow-hidden">
                        {selectedImage ?
                            selectedImage.map((image, index) =>
                                <div key={index} className="relative border shadow-md flex items-center justify-center w-1/4 aspect-square hover:text-gray-600 hover:shadow-lg overflow-hidden">
                                    <img src={image} key={index} className="w-full h-full object-cover" />
                                    <FontAwesomeIcon icon={faClose} onClick={() => { handleXButtonCLick(image, index) }} className="absolute top-0 right-0 p-2 text-gray-300 hover:bg-gray-100 cursor-pointer " title="Remove this image"> </FontAwesomeIcon>
                                </div>
                            ) :
                            ''
                        }
                        <div className="border shadow-md flex items-center justify-center w-1/4 aspect-square hover:text-gray-600 hover:shadow-lg" title="Add an image" onClick={clickUpload}>
                            <FontAwesomeIcon icon={faPlus} className="font-bold text-3xl text-gray-300"></FontAwesomeIcon>
                            <input type="file" ref={fileSelect} accept="image/jpeg, image/png, image/gif" multiple onChange={fileSelectChange} className="hidden" />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button className="bg-gray-600 text-white w-full text-md text-center py-4 px-2 rounded-md hover:bg-gray-500 flex items-center justify-center " onClick={createPost}> 
                        { postUploading ? < img className="w-6 h-6" src='https://i.gifer.com/origin/44/446bcd468478f5bfb7b4e5c804571392_w200.webp' />  :  'Publish' }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost