import { useEffect } from 'react';

function useFontSizeSetter() {
    useEffect(() => {
        const updateFontSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Dynamically calculate font sizes based on screen dimensions
            const headerSize = Math.min(width * 0.1, height * 0.12);
            const paragraphSize = Math.min(width * 0.02, height * 0.02);
            const footerSize = Math.min(width * 0.05, height * 0.03);
            const iconScale = Math.min(width * 0.0011, height * 0.0011); // Scale for icons

            
            // Apply styles to elements
            document.documentElement.style.setProperty('--header-font-size', `${headerSize}px`);
            document.documentElement.style.setProperty('--paragraph-font-size', `${paragraphSize}px`);
            document.documentElement.style.setProperty('--footer-font-size', `${footerSize}px`);
            document.documentElement.style.setProperty('--icon-scale', `${iconScale}`);
        };

        // Update font sizes on load and resize
        updateFontSize();
        window.addEventListener('resize', updateFontSize);

        return () => {
            window.removeEventListener('resize', updateFontSize);
        };
    }, []);
}

export default useFontSizeSetter;