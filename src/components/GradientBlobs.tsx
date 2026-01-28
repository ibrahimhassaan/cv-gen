"use client";

export function GradientBlobs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white">
            {/* Main Indigo/Purple Glow - Top Right */}
            <div
                className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full opacity-40 blur-[100px] animate-blob-morph"
                style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
                    animationDuration: '25s'
                }}
            />

            {/* Soft Cyan/Teal Glow - Bottom Left */}
            <div
                className="absolute top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full opacity-30 blur-[100px] animate-blob-morph-reverse"
                style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
                    animationDuration: '30s',
                    animationDelay: '-5s'
                }}
            />

            {/* Subtle Pink/Warm Accent - Center/Bottom */}
            <div
                className="absolute top-[60%] right-[20%] w-[50vw] h-[50vw] rounded-full opacity-20 blur-[100px] animate-blob-float"
                style={{
                    background: 'radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
                }}
            />

            {/* Very faint noise texture for premium feel */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        </div>
    );
}
