const Logo = () => {
    return (
        <div className="relative inline-block group font-poppins">
            {/* Efeito de profundidade ajustado */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#9B5DE5] to-[#6ECCAF] blur-[20px] opacity-30 rounded-lg animate-glow" />
            {/* Container principal com padding */}
            <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.05em]"> 
                    <span className="relative inline-block">
                        {/* Texto principal com margem protegida */}
                        <span className="relative bg-gradient-to-r from-[#9B5DE5] to-[#6ECCAF] bg-clip-text text-transparent px-1">
                            Pag
                            <span className="text-[#6ECCAF] font-black mx-0.5 align-middle">A</span>
                            ê
                            {/* Exclamação com posicionamento ajustado */}
                            <span className="text-[#F15BB5] absolute -right-6 top-0.5 text-4xl transform -rotate-12">!</span>
                        </span>
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default Logo;