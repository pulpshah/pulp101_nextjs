'use client'

type PropType = {
    logos: {
        src: string;
        alt: string;
    }[];
}


const InfiniteScroll: React.FC<PropType> = ( props ) => {
    const {logos} = props;

    return(
        
        <ul
            className="flex items-center w-max justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none gap-[1rem]  animate-infinite-scroll"
            id="logo-container"
        >
            {logos.map((logo, index) => (
            <li key={index}>
                <img src={logo.src} className="w-auto h-auto" alt={logo.alt}/>
            </li>
            ))}
        </ul>
        
    )
}

export default InfiniteScroll;