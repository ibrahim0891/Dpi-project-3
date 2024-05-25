/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";

// eslint-disable-next-line react/prop-types 
const Post = ({ authorData, title, bodyText, imageArray, timestamp }) => {
    let [authorInfo, setAuthorInfo] = useState('')
    useEffect(() => {
        get(child(ref(database), '/users/' + authorData)).then((snapshot) => {
            setAuthorInfo(snapshot.val())
            console.log(snapshot.val());
        })
    }, [])
    return (
        <div className="p-4 border rounded-md shadow-md space-y-2">

            <div className="text-xl flex items-center flex-col space-y-4 ">
                {authorInfo && <img className="w-16 rounded-full border shadow-xl" src={authorInfo.info.avater} />}
                <span className="text-center text-sm">
                    {authorInfo && authorInfo.info.fname} on {timestamp}
                </span>
                 <h1 className="text-2xl font-bold text-center "> {title} </h1>
            </div>
            <p className="text-sm py-3 "> {bodyText} </p>
            {imageArray ?
                <div className="flex flex-no-wrap overflow-x-auto items-center gap-4 ">
                    {imageArray.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt=""
                            className='h-3/4 rounded-md shadow-md'
                        />
                    ))}
                </div>
                : "Loading..."}
            {imageArray.length > 1 ? <div>Scroll horizontally to see other images! </div> : null}
        </div>
    )
}

export default Post