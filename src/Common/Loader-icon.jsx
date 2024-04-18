

let LoaderIcon = ({customClasses}) => {
    return (
        <div className={'flex items-center justify-center h-full w-full absolute top-0 left-0 '+ customClasses }>
            <img src="https://icons8.com/preloaders/preloaders/785/Half%20circle.gif" alt="" />
            {/* <img src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952rgdclg01243vm5jl8je6h9o50d39jbugg6gud7l6&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="" /> */}
        </div>
    )
}


export default LoaderIcon