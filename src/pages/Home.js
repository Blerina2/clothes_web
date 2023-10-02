import {useEffect} from "react";

const Home = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            setTimeout(() => {
                window.location.href = "/signup"
            }, 100);
        }
    }, []);
};

export default Home;
