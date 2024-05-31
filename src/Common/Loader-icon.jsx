

let LoaderIcon = ({ customClasses, iconWidth }) => {
    return (
        <div className={'flex items-center justify-center absolute top-0 left-0 ' + customClasses}>
            {/* <img className={iconWidth} src="https://icons8.com/preloaders/preloaders/785/Half%20circle.gif" alt="" /> */}
            <div className="h-12 w-12 overflow-hidden rounded-full flex items-center justify-center relative">
                <div className="h-12 w-6 bg-gray-500 animate-spin"> </div>
                <div className="h-10 w-10 bg-white rounded-full absolute top-1 left-1"> </div>
            </div>
            {/* <img src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952rgdclg01243vm5jl8je6h9o50d39jbugg6gud7l6&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="" /> */}
        </div>
    )
}


export default LoaderIcon