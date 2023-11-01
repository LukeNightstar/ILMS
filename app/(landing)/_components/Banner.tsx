import React from 'react';

const Banner = () => {
    return (
        <div
            className="sticky z-[49] top-0 w-full overflow-hidden py-4 px-3 h-[80] lg:h-auto text-white text-base font-bold flex items-center justify-center gap-3 cursor-pointer"
            style={{
                background: 'linear-gradient(0deg, rgb(23, 24, 30), rgb(23, 24, 30)), linear-gradient(90deg, rgb(177, 116, 255) 0%, rgb(255, 209, 189) 100%), rgb(23, 24, 30)',
                backgroundBlendMode: 'overlay, normal, normal'
            }}
        >
            배너배너배너배너배너배너배너배너
            <button className="bg-white rounded-md">
                <p className="bg-clip-text text-[#B275FF] px-2 py-1 text-sm">
                    배너임미다
                </p>
            </button>
            <a className="w-full absolute left-0 top-0 pointer-events-none"/>
        </div>
    );
};

export default Banner;
