import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import ListEvenets from "../event/ListEvents";
import M from "materialize-css";
import { Divider } from "react-materialize";

const Home = () => {
    const isUserLogged = useSelector(
        // eslint-disable-next-line comma-dangle
        (state: any) => state.userState.isUserLogged
    );
    let carousel: any;

    useEffect(() => {
        const instance = M.Carousel.init(carousel, {
            fullWidth: true,
            indicators: true,
            duration: 500,
        });

        const intervalID = setInterval(() => {
            instance.next();
        }, 5000);

        return () => {
            clearInterval(intervalID);
        };
    }, [carousel]);
    return (
        <div>
            <div
                className='carousel carousel-slider center'
                ref={(Carousel) => {
                    carousel = Carousel;
                }}
            >
                <div className='carousel-fixed-item center white-text'>
                    <h2>Have FUN!</h2>
                </div>
                <a className='carousel-item' href='#one!'>
                    <img src='https://lorempixel.com/250/250/nature/1' />
                </a>
                <a className='carousel-item' href='#two!'>
                    <img src='https://lorempixel.com/250/250/nature/2' />
                </a>
                <a className='carousel-item' href='#three!'>
                    <img src='https://lorempixel.com/250/250/nature/3' />
                </a>
                <a className='carousel-item' href='#four!'>
                    <img src='https://lorempixel.com/250/250/nature/4' />
                </a>
                <a className='carousel-item' href='#five!'>
                    <img src='https://lorempixel.com/250/250/nature/5' />
                </a>
            </div>
            {!isUserLogged && (
                <div className='card-panel red lighten-2 center'>
                    Please login to see the available events!
                </div>
            )}
            {isUserLogged && <ListEvenets></ListEvenets>}
        </div>
    );
};

export default Home;
