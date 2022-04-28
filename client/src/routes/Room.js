import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { faCrown, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Room() {
    return (
        <div className="w-screen h-screen bg-slate-100 overflow-hidden">
            <Navbar />
            <main className="w-screen h-full flex md:flex-row flex-col justify-evenly items-center">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <iframe 
                        className="w-3/4 h-1/2"
                        src="https://www.youtube.com/embed/wiPMZs6lIMI"
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                        allowfullscreen
                    >
                    </iframe>
                    <div className="w-full flex flex-col justify-start ml-[25%]">
                        <h2 className="text-xl text-bold mt-2">$tupid Young - Cold Nights (Official Video)</h2>
                        <p className="opacity-50">Room created by <span>Test</span></p>
                        <p className="opacity-50"><FontAwesomeIcon className="mr-1" icon={faUsers} /> 2 joined</p>
                    </div>
                    
                </div>
                <div className="w-full h-full flex flex-col items-center">
                <div className="h-1/4 w-1/3 bg-white mt-10 mr-10 mb-10 border-slate-50 border max-h-[1/4] overflow-y-auto">
                    <h6 className="text-lg border-b border-gray-400 text-center border-opacity-50 text-bold">Participant List</h6>
                    <ul className="mt-2 pl-2">
                        <li>Test<FontAwesomeIcon className="ml-2" icon={faCrown} /></li>
                        <li>Another Test</li>
                    </ul>
                </div>
                <div className="h-1/2 w-1/2 bg-white mr-10"></div>
                

                </div>
            </main>
            <Footer />
        </div>
    );
}