import { links } from "../../assets/Vars"
import BackButton from "../Components/BackButton"
import moutainPeak from "../../assets/img/mountain-peak-white-minimalist-dslzfihulnhf9wfy.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons"

import { useEffect, useRef, useState } from "react"


const CreatePost = () => {
    const [selectedImage, setSelectedImages] = useState([])
    const [selectedFile, setSelectedFile] = useState([])
    const fileSelect = useRef(null)
    let clickUpload = () => {
        if (fileSelect.current) {
            let fileSelector = fileSelect.current
            fileSelector.click()
        }
    }

    let fileSelectChange = (e) => {
        const files = e.target.files;
        const newSelectedImages = Array.from(files).filter(file =>
            file && /\.(jpe?g|png|gif)$/i.test(file.name)
        ).map(file => {
            let localImgUrl = URL.createObjectURL(file)
            return { localImgUrl, file }
        });
        setSelectedImages((prevImages) => [
            ...prevImages,
            ...newSelectedImages.map((image) => image.localImgUrl),
        ]);
        setSelectedFile((prevImages) => [
            ...prevImages,
            ...newSelectedImages.map((image) => image.file),
        ])
    }
    const handleXButtonCLick = (imageUrl, index) => {
        const updatedImages = selectedImage.filter((image) => image !== imageUrl);
        setSelectedImages(updatedImages)
        
        const updatedFiles = [...selectedFile];
        updatedFiles.splice(index, 1);
        setSelectedFile(updatedFiles);
    };

    useEffect(() => {
        console.log(selectedFile);
    }, [selectedFile]);
    return (
        <div>
            <BackButton buttonLink={links.home.root} titlebarText={`Create a new post!`} />
            <div className="">
                <img src={moutainPeak} />
                <div className="font-thin m-6 p-8 border shadow flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="p-4 border-b rounded-md w-full shadow text-2xl font-bold block placeholder-gray-400"
                        title="Set a title for your post!"
                    />
                    <textarea
                        placeholder="Unleash your idea..."
                        className="text-md font-light p-4 border shadow  w-full resize-none block aspect-video focus:outline-0">
                    </textarea>
                    <h3 className="font-bold text-xl text-gray-500 my-4 "> Add images</h3>
                    <div className="flex flex-wrap">
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
                            <input type="file" ref={fileSelect} accept="image/jpeg, image/png, image/gif" onChange={fileSelectChange} className="hidden" />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button className="bg-gray-600 text-white block w-full text-md text-center py-4 px-2 rounded-md hover:bg-gray-500 "> Publish </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost