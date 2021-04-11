const ColorMap = {
    default: 'default-ripple', //rgba(0, 0, 0, 0.3);
    plain: 'plain-ripple', //rgba(0, 0, 0, 0.3);
    primary: 'primary-ripple', //rgba(25, 118, 210, 0.3);
    secondary: 'secondary-ripple', //rgba(220, 0, 78, 0.3);
}

export default {
    data() {
        return {}
    },

    methods: {
        setColor(target, color) {
            if (!color) return
            else target.classList.add(ColorMap[color]);
        },
        setVelocity(target, velocity) {
            //default slow  animation: ripple 800ms ease-out;
            if (!velocity) return
                //fast animation: ripple 400ms ease-out;
            else target.classList.add('fast-ripple');
        },
        createRippleByAddingLayer(e, isFixed, color, velocity) {
            //todo using an outer layer
            let target = e.currentTarget;
            //config the father component
            if (target.style.position !== 'absolute') target.style.position = 'relative'
            this.setColor(target, color)
            this.setVelocity(target, velocity)
                //generate an outer el
            let outer = document.createElement('div')
            outer.style.overflow = 'hidden'
            outer.style.position = 'absolute'
            outer.style.top = '0'
            outer.style.left = '0'
            outer.style.width = '100%'
            outer.style.height = '100%'
                // outer.style.zIndex = '-100'
            outer.style.borderRadius = 'inherit'
            outer.classList.add("ripple-outer");


            let ripple = document.createElement("span");
            let radius = 21;
            let left = 0;
            let top = 0;
            //todo IMPORTANT target.getBoundingClientRect() get the size and absolute view position of an el(page position = view position+window.scroll)
            //todo IMPORTANT target.offsetLeft() relative position of an el, which is different from the target.getBoundingClientRect().left for an absolute el
            const boundingRect = target.getBoundingClientRect()
            if (isFixed) {
                left = boundingRect.width / 2 - radius;
                top = boundingRect.height / 2 - radius;
            } else {
                left = e.clientX - boundingRect.left - radius;
                top = e.clientY - boundingRect.top - radius;
                // console.log('createRippleX', e.pageX, e.clientX, target.offsetLeft, boundingRect.left, left)
                // console.log('createRippleY', e.pageY, e.clientY, target.offsetTop, boundingRect.top, top)
            }
            ripple.style.width = ripple.style.height = `42px`;
            ripple.style.left = `${left}px`;
            ripple.style.top = `${top}px`;
            //todo target.getBoundingClientRect().left target.offsetLeft
            ripple.classList.add("ripple");

            //romove the former ripple
            const formerRipple = target.getElementsByClassName("ripple-outer")[0];
            if (formerRipple) formerRipple.remove();
            //mount the ripple
            outer.appendChild(ripple);
            //mount the outer
            target.appendChild(outer);
        },
        createRipple(e, isFixed, color, velocity) {
            let target = e.currentTarget;
            //config the father component
            console.log('createRipple', target, target.style)
            if (target.style.position !== 'absolute') target.style.position = 'relative'
            target.style.overflow = 'hidden'
            this.setColor(target, color)
            this.setVelocity(target, velocity)
            let ripple = document.createElement("span");
            let radius = 21;
            let left = 0;
            let top = 0;
            //todo IMPORTANT target.getBoundingClientRect() get the size and absolute view position of an el(page position = view position+window.scroll)
            //todo IMPORTANT target.offsetLeft() relative position of an el, which is different from the target.getBoundingClientRect().left for an absolute el
            const boundingRect = target.getBoundingClientRect()
            if (isFixed) {
                left = boundingRect.width / 2 - radius;
                top = boundingRect.height / 2 - radius;
            } else {
                // console.log('createRippleX', e.pageX, e.clientX, target.offsetLeft, boundingRect.left)
                // console.log('createRippleY', e.pageY, e.clientY, target.offsetTop, boundingRect.top)
                left = e.clientX - boundingRect.left - radius;
                top = e.clientY - boundingRect.top - radius;
            }
            ripple.style.width = ripple.style.height = `42px`;
            ripple.style.left = `${left}px`;
            ripple.style.top = `${top}px`;
            //todo target.getBoundingClientRect().left target.offsetLeft
            ripple.classList.add("ripple");
            //romove the former ripple
            const formerRipple = target.getElementsByClassName("ripple")[0];
            if (formerRipple) formerRipple.remove();
            //mount the ripple
            target.appendChild(ripple);
            // console.log(target, ripple)
        },
    }
}