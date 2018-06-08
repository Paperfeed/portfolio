import {keyframes} from "styled-components";

const Animations = {
    slideInTop: keyframes`
        from { 
            transform: translateY(-100%); 
            opacity: 0;
        }
        to { 
            transform: '';
            opacity: 1;
        }
    `,
    fadeIn: keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
    `
};

export default Animations;