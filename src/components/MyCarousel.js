import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselCaption,
    CarouselIndicators
} from 'reactstrap';

const items = [
    {
        id: 1,
        // src: 'https://picsum.photos/200/300?random=1',
        src: 'https://source.unsplash.com/random/500x250?sig=1',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        id: 2,
        src: 'https://source.unsplash.com/random/500x250?sig=2',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        id: 3,
        src: 'https://source.unsplash.com/random/500x250?sig=3',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];

const MyCarousel = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };
    const goToIndex = newIndex => {
        if (animating) return;
        setActiveIndex(newIndex);
    };
    const slides = items.map(item => {
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <img className='d-block w-100' src={item.src} alt={item.altText} />
                <CarouselCaption
                    className="text-warning"
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });
    return (
        <div>
            <style>
                {`.custom-tag {max-width: 100%;height: 500px;background: black;}`}
            </style>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                {/* <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                /> */}
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>
        </div>
    );
}
export default MyCarousel
